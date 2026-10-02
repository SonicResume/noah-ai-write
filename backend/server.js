import express from "express";
import cors from "cors";
import multer from "multer";
import PQueue from "p-queue";
import rateLimit from "express-rate-limit";
import bcrypt from "bcryptjs";
import Stripe from "stripe";
import nodemailer from "nodemailer";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const pdfModule = require("pdf-parse");

// HARD normalize all possible export shapes
const pdfParse =
  pdfModule?.default?.default ||
  pdfModule?.default ||
  pdfModule;

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3010;

// ---------------- CORE STATE ----------------
let users = fs.existsSync("./users.json")
  ? JSON.parse(fs.readFileSync("./users.json"))
  : {};

const credits = {};
const cache = new Map();
const queue = new PQueue({ concurrency: 2 });

// ---------------- STRIPE ----------------
const stripe = process.env.STRIPE_SECRET_KEY
  ? new Stripe(process.env.STRIPE_SECRET_KEY)
  : null;

// ---------------- EMAIL ----------------
const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ---------------- LANGUAGE ENGINE ----------------
const LANGS = {
  en: "English",
  es: "Spanish",
  fr: "French",
  de: "German",
  it: "Italian",
  pt: "Portuguese",
  nl: "Dutch",
  sv: "Swedish",
  no: "Norwegian",
  da: "Danish",
  fi: "Finnish",
  pl: "Polish",
  cs: "Czech",
  hu: "Hungarian",
  ro: "Romanian",
  tr: "Turkish",
  ar: "Arabic",
  hi: "Hindi",
  bn: "Bengali",
  ur: "Urdu",
  ta: "Tamil",
  vi: "Vietnamese",
  id: "Indonesian",
  th: "Thai",
  zh: "Chinese",
  ja: "Japanese",
  ko: "Korean",
  ru: "Russian",
  uk: "Ukrainian",
  fa: "Persian",
};

// ---------------- MIDDLEWARE ----------------
app.use(cors());
app.use(express.json({ limit: "2mb" }));
app.use(express.urlencoded({ extended: true }));

const upload = multer({ dest: "uploads/", limits: { fileSize: 2 * 1024 * 1024 } });

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
});

// ---------------- UTIL ----------------
function getCredits(id) {
  if (!credits[id]) credits[id] = 20;
  return credits[id];
}

function normalizeLang(lang = "es") {
  return LANGS[lang.toLowerCase()] || lang;
}

// ---------------- AI CALL ----------------
async function runAI(prompt, model = "mistral-small-latest") {
  const res = await fetch("https://api.mistral.ai/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.MISTRAL_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model,
      temperature: 0,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  const data = await res.json();
  return data?.choices?.[0]?.message?.content?.trim() || "";
}

// ---------------- TRANSLATION ENGINE (REAL) ----------------
async function translate(text, lang) {
  const language = normalizeLang(lang);

  const prompt = `
You are a professional translation engine.

Translate into: ${language}

RULES:
- Output ONLY translation
- No explanation
- No formatting
- Preserve meaning exactly
- Preserve tone

TEXT:
${text}
`;

  return runAI(prompt, "mistral-large-latest");
}

// ---------------- AI TASKS ----------------
function buildPrompt(text, tool) {
  const tasks = {
    rewrite: "Rewrite naturally and clearly.",
    expand: "Expand with detail and clarity.",
    summarize: "Summarize clearly and concisely.",
    grammar: "Fix grammar only. No rewriting.",
  };

  return `
TASK:
${tasks[tool] || tasks.rewrite}

INPUT:
${text}

Return ONLY result.
`;
}
async function processText(text, tool, language) {

  if (tool === "translate") {
    return await queue.add(() =>
      translate(text, language)
    );
  }

  const prompt = buildPrompt(text, tool);

  return await queue.add(() =>
    runAI(prompt)
  );
}

// ---------------- SAFE FILE READER ----------------
async function readFile(file) {
  // Guard clause against missing upload payloads
  if (!file || !file.path) {
    throw new Error("No file uploaded or file metadata missing.");
  }

  const ext = path.extname(file.originalname).toLowerCase();

  // Track if we successfully processed the file inside our router block
  try {
    if ([".txt", ".md", ".csv", ".json"].includes(ext)) {
      return fs.readFileSync(file.path, "utf8");
    }

    if (ext === ".pdf") {
      const fileBuffer = fs.readFileSync(file.path);
      const data = await pdfParse(fileBuffer);

      // Edge-case handle scanned image PDFs containing zero structural text characters
      if (!data.text || !data.text.trim()) {
        throw new Error("PDF file appears to be empty or contains scanned images without selectable text.");
      }
      return data.text;
    }

    if (ext === ".docx") {
      const data = await mammoth.extractRawText({ path: file.path });
      return data.value;
    }

    throw new Error(`Unsupported file extension: ${ext}`);
  } catch (error) {
    throw error;
  } finally {
    // GUARANTEE CLEANUP: This block executes no matter what happens above
    if (fs.existsSync(file.path)) {
      fs.unlinkSync(file.path);
    }
  }
}


// ================= ROUTES =================

// HEALTH
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "SaaS Engine" });
});

// AI PROCESS
app.post("/api/process", limiter, async (req, res) => {
  try {
    const { text, tool, language, id = "guest" } = req.body;

    if (!text?.trim()) {
      return res.status(400).json({ error: "Text required" });
    }

    if (!credits[id]) credits[id] = 20;

    if (credits[id] < 2) {
      return res.json({ success: false, error: "No credits" });
    }

    credits[id] -= 2;

    const result = await processText(text, tool, language);

    res.json({
      success: true,
      result,
      credits: credits[id],
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Processing failed" });
  }
});

// FILE UPLOAD
app.post("/api/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: "No file uploaded" });
    }

    const text = await readFile(req.file);

    return res.json({
      success: true,
      text
    });

  } catch (e) {
    console.error("UPLOAD ERROR:", e);

    if (req.file?.path && fs.existsSync(req.file.path)) {
      fs.unlinkSync(req.file.path);
    }

    return res.status(500).json({
      success: false,
      error: e.message || "File parsing failed"
    });
  }
});

// SIGNUP
app.post("/api/signup", async (req, res) => {
  const { email, password } = req.body;

  if (users[email]) return res.status(400).json({ error: "Exists" });

  const hash = await bcrypt.hash(password, 10);
  users[email] = { email, password: hash };

  fs.writeFileSync("./users.json", JSON.stringify(users, null, 2));

  res.json({ success: true });
});

// LOGIN
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  const user = users[email];
  if (!user) return res.status(400).json({ error: "Not found" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ error: "Invalid" });

  res.json({ success: true });
});

// CONTACT
app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  await mailer.sendMail({
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `Contact ${name}`,
    text: `${email}\n\n${message}`,
  });

  res.json({ success: true });
});

// STRIPE CHECKOUT
app.post("/api/checkout", async (req, res) => {
  const { priceId, email } = req.body;

  if (!stripe) return res.status(500).json({ error: "Stripe missing" });

  const session = await stripe.checkout.sessions.create({
    mode: "subscription",
    customer_email: email,
    line_items: [{ price: priceId, quantity: 1 }],
    success_url: "http://localhost:5173",
    cancel_url: "http://localhost:5173",
  });

  res.json({ url: session.url });
});

// STRIPE WEBHOOK
app.post(
  "/api/webhook",
  express.raw({ type: "application/json" }),
  (req, res) => {
    try {
      const event = stripe.webhooks.constructEvent(
        req.body,
        req.headers["stripe-signature"],
        process.env.STRIPE_WEBHOOK_SECRET
      );

      if (event.type === "checkout.session.completed") {
        const email = event.data.object.customer_email;

        if (email) {
          credits[email] = (credits[email] || 0) + 200;
        }
      }

      res.sendStatus(200);
    } catch {
      res.sendStatus(400);
    }
  }
);

// ---------------- START ----------------
app.listen(PORT, () => {
  console.log(`🚀 SaaS running on port ${PORT}`);
});
