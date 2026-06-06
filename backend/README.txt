🧙‍♂️ NOAH AI WriterTurn weak sentences into crisp, professional, high-energy content instantly. Built with a beautiful comic/retro dashboard layout, client-side file parsing, and a split server architecture.🎨 Under The Hood ArchitectureNOAH uses an industry-standard split application design to ensure lightning-fast text processing, secure data encryption, and simple deployment guardrails:Frontend UI: Built with React, TypeScript, and Tailwind CSS. Hosted on Vercel (static edge network).Backend Node API Engine: Powered by Express.js and Node.js. Hosted on Render (persistent web service).Authentication Network: Managed by Firebase Identity Platform via client-side token injection tokens.Payment Infrastructure: Automated subscription checkout channels fueled by Stripe Connect APIs.Generative Processing Layers: Primary queries target local Ollama nodes (llama3.1:8b and qwen2.5:7b), with an automatic secure failover fallback routed to OpenAI's cloud API (gpt-4o-mini).📦 File Directory MaptextD:\ai-writer\
├── public\               # Client-side static image visual assets
│   ├── favicon.png       # Dynamic browser title tab icon asset
│   └── images\
│       └── aiwrite-fun-workspace.png  # Playful workspace layout asset
├── src\                  # React Application Front-end Layer
│   ├── components\       # Modular interface panels and components
│   │   ├── Navbar.tsx    # Styled orange & brown retro navbar header
│   │   └── FunSpinner.tsx# Animated gear spinner with rotating text phrases
│   ├── pages\
│   │   ├── LandingPage.tsx   # Comic-book styled high conversion landing view
│   │   ├── Login.tsx     # Fully patched responsive form with Firebase Auth
│   │   └── ContactPage.tsx # Form with floating retro error popup banners
│   ├── firebase.ts       # Central initialization module for project "resume-97612"
│   └── App.tsx           # React Router coordinate matrix mappings
└── backend\              # Node.js Server Engine Room Compartment
    ├── server.js         # Core Express app, tools parser routing, and queues
    └── .env              # Hidden variable sandbox layout
Use code with caution.🚀 Local Deployment SetupFollow these exact steps to run the application workspace stack locally on your machine.1. Fire Up the Backend APIOpen your terminal (Command Prompt or PowerShell) and run:bashcd D:\ai-writer\backend
npm install
node server.js