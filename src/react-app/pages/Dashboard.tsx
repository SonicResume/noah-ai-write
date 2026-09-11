import { useState, useEffect } from "react";
import { 
  RefreshCw, 
  Expand, 
  FileText, 
  CheckCircle, 
  MessageSquare, 
  Languages,
  Video,
  Copy,
  ArrowRight,
  Download,
  RotateCcw
} from "lucide-react";
import { ToolButton } from "@/react-app/components/ToolButton";
import { ToneSelector } from "@/react-app/components/ToneSelector";
import { LanguageSelector } from "@/react-app/components/LanguageSelector";
import { ContentTypeSelector, contentTypes } from "@/react-app/components/ContentTypeSelector";

type Tool = "rewrite" | "expand" | "summarize" | "grammar" | "tone" | "translate";

const tools = [
  { id: "rewrite" as Tool, label: "Rewrite", icon: RefreshCw, description: "Improve clarity and flow" },
  { id: "expand" as Tool, label: "Expand", icon: Expand, description: "Add more detail and depth" },
  { id: "summarize" as Tool, label: "Summarize", icon: FileText, description: "Condense to key points" },
  { id: "grammar" as Tool, label: "Fix Grammar", icon: CheckCircle, description: "Correct errors" },
  { id: "tone" as Tool, label: "Change Tone", icon: MessageSquare, description: "Adjust voice and style" },
  { id: "translate" as Tool, label: "Translate", icon: Languages, description: "Convert to another language" },
];

const tones = ["Professional", "Casual", "Formal", "Friendly", "Persuasive", "Academic"];
const languages = ["Spanish", "French", "German", "Italian", "Portuguese", "Japanese", "Chinese", "Korean"];

export default function ToolPage() {
  const [selectedTool, setSelectedTool] = useState<Tool>("rewrite");
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedTone, setSelectedTone] = useState(tones[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [selectedContentType, setSelectedContentType] = useState(contentTypes[0].id);
  const [copied, setCopied] = useState(false);

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

  const handleReset = () => {
    setInputText("");
    setOutputText("");
  };

const handleProcess = async () => {
  if (!inputText.trim()) return;

  if (inputText.length > 10000) {
    alert("Text too long (max 10,000 characters)");
    return;
  }

  setIsProcessing(true);
  setOutputText("");

  const API_URL =
    import.meta.env.VITE_API_URL ||
    "https://my-backend-1-qdhh.onrender.com";

  const controller = new AbortController();

  // Allow up to 2 minutes for AI processing.
  const timeout = setTimeout(() => controller.abort(), 120000);

  const payload = {
    text: inputText,
    tool: selectedTool,
    contentType: selectedContentType,
    ...(selectedTool === "tone" ? { tone: selectedTone } : {}),
    ...(selectedTool === "translate" ? { language: selectedLanguage } : {}),
  };

  try {
    const response = await fetch(`${API_URL}/api/ai`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new Error(
        `AI service error (${response.status}): ${await response.text()}`
      );
    }

    const data = await response.json();

    if (!data?.result) {
      throw new Error("The AI service returned an empty response.");
    }

    setOutputText(data.result);
  } catch (error: any) {
    if (error?.name === "AbortError") {
      setOutputText(
        "The AI request timed out. Please try again."
      );
    } else {
      setOutputText(
        error?.message || "Processing failed. Please try again."
      );
    }
  } finally {
    clearTimeout(timeout);
    setIsProcessing(false);
  }
};
const handleCopy = async () => {
    if (!outputText) return;
    await navigator.clipboard.writeText(outputText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    if (!outputText) return;
    
    const blob = new Blob([outputText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `AIWrite-${selectedTool}-${Date.now()}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-background ink-pattern">
      <main className="max-w-6xl mx-auto px-4 py-8">
        
        {/* Content Type Selection */}
        <ContentTypeSelector 
          selectedType={selectedContentType} 
          onSelect={setSelectedContentType} 
        />

        {/* Tool Selection */}
        <div className="mb-8">
          <h2 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">Select a tool</h2>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <ToolButton
                key={tool.id}
                tool={tool}
                isSelected={selectedTool === tool.id}
                onClick={() => setSelectedTool(tool.id)}
              />
            ))}
          </div>
        </div>

        {/* Additional Options for Tone/Translate */}
        {selectedTool === "tone" && (
          <ToneSelector 
            tones={tones} 
            selectedTone={selectedTone} 
            onSelect={setSelectedTone} 
          />
        )}
        {selectedTool === "translate" && (
          <LanguageSelector 
            languages={languages} 
            selectedLanguage={selectedLanguage} 
            onSelect={setSelectedLanguage} 
          />
        )}

        {/* Main Content Area */}
        <div className="grid md:grid-cols-2 gap-6">
          
          {/* Input Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Your Text</label>
              <div className="flex items-center gap-3">
                <span className="text-xs text-muted-foreground">{inputText.length} characters</span>
              </div>
            </div>
            
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type your text here..."
                className="w-full h-72 p-4 bg-card border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all custom-scrollbar text-foreground placeholder:text-muted-foreground"
              />
            </div>
            
            {/* Action Bar */}
            <div className="flex justify-between items-center pt-2">
              <button 
                type="button"
                onClick={handleReset}
                disabled={!inputText && !outputText}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-lg bg-card text-foreground hover:bg-accent hover:text-accent-foreground active:scale-[0.98] disabled:opacity-40 disabled:cursor-not-allowed transition-all"
              >
                <RotateCcw className="w-4 h-4" /> Reset
              </button>

              <button
                type="button"
                onClick={handleProcess}
                disabled={isProcessing || !inputText.trim()}
                className="flex items-center gap-2 px-5 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-sm transition-all"
              >
                {isProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" /> Processing...
                  </>
                ) : (
                  <>
                    Generate content <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Generated Output</label>
              {outputText && !isProcessing && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="flex items-center gap-1 text-xs text-primary hover:underline font-medium transition-all"
                  >
                    <Copy className="w-3 h-3" />
                    {copied ? "Copied!" : "Copy Output"}
                  </button>
                  <button
                    type="button"
                    onClick={handleExport}
                    className="flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground font-medium transition-all"
                  >
                    <Download className="w-3 h-3" /> Export
                  </button>
                </div>
              )}
            </div>
            
            <div className="relative">
              {isProcessing && (
                <div className="absolute inset-0 bg-background/60 backdrop-blur-[1px] flex justify-center items-center rounded-xl z-10">
                  <RefreshCw className="w-8 h-8 text-primary animate-spin" />
                </div>
              )}
              <textarea
                value={outputText}
                readOnly
                placeholder="AI response layout content outputs here..."
                className="w-full h-72 p-4 bg-card border border-border rounded-xl resize-none focus:outline-none text-foreground placeholder:text-muted-foreground custom-scrollbar"
              />
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}
