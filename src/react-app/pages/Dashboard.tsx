import { useState, useEffect, useRef } from "react";
import { 
  RefreshCw, 
  Expand, 
  FileText, 
  CheckCircle, 
  MessageSquare, 
  Languages,
  Sparkles,
  Copy,
  ArrowRight,
  Upload,
  File,
  X,
  Download
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
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: number } | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check file size (max 100KB for text files)
    if (file.size > 100 * 1024) {
      alert("File is too large. Please upload a file smaller than 100KB.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setInputText(text);
      setUploadedFile({ name: file.name, size: file.size });
    };
    reader.onerror = () => {
      alert("Failed to read file. Please try again.");
    };
    reader.readAsText(file);
  };

  const clearUploadedFile = () => {
    setUploadedFile(null);
    setInputText("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    return `${(bytes / 1024).toFixed(1)} KB`;
  };

  // Load Google Fonts
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => { document.head.removeChild(link); };
  }, []);

 const handleProcess = async () => {

  if (!inputText.trim()) return;

  if (inputText.length > 10000) {
    alert("Text too long (max 10,000 characters)");
    return;
  }

  setIsProcessing(true);
  setOutputText("");

  try {
    const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/process`,
  {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tool: selectedTool,
      text: inputText,
      tone: selectedTool === "tone" ? selectedTone : undefined,
      language: selectedTool === "translate" ? selectedLanguage : undefined,
      contentType: selectedContentType,
    }),
  }
);

    if (!response.ok) {
      const err = await response.text();
      throw new Error(err);
    }

    const data = await response.json();
    setOutputText(data.result);

  } catch (error: any) {
    setOutputText(error.message || "Processing failed.");
  } finally {
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

  const currentTool = tools.find(t => t.id === selectedTool);

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
                {uploadedFile && (
                  <div className="flex items-center gap-2 px-2 py-1 bg-primary/10 rounded-md">
                    <File className="w-3.5 h-3.5 text-primary" />
                    <span className="text-xs text-foreground">{uploadedFile.name}</span>
                    <span className="text-xs text-muted-foreground">({formatFileSize(uploadedFile.size)})</span>
                    <button 
                      onClick={clearUploadedFile}
                      className="p-0.5 hover:bg-primary/20 rounded transition-colors"
                    >
                      <X className="w-3 h-3 text-muted-foreground hover:text-foreground" />
                    </button>
                  </div>
                )}
                <span className="text-xs text-muted-foreground">{inputText.length} characters</span>
              </div>
            </div>
            <div className="relative">
              <textarea
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                placeholder="Paste or type your text here..."
                className="w-full h-72 p-4 bg-card border border-border rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all custom-scrollbar text-foreground placeholder:text-muted-foreground"
                style={{ fontFamily: "'Inter', sans-serif" }}
              />
              {/* File Upload Button */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".txt,.md,.pdf,.doc,.docx,.csv"
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current?.click()}
                className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-muted/80 hover:bg-muted text-muted-foreground hover:text-foreground rounded-lg text-xs font-medium transition-all border border-border/50"
              >
                <Upload className="w-3.5 h-3.5" />
                Upload file
              </button>
            </div>
          </div>

          {/* Output Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium text-foreground">Result</label>
              {outputText && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleExport}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                    Export
                  </button>
                  <button
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Copy className="w-3.5 h-3.5" />
                    {copied ? "Copied!" : "Copy"}
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <div 
                className={`w-full h-72 p-4 bg-card border border-border rounded-xl overflow-auto custom-scrollbar ${
                  isProcessing ? "loading-shimmer" : ""
                }`}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span className="text-sm">Processing your text...</span>
                  </div>
                ) : outputText ? (
                  <p className="text-foreground whitespace-pre-wrap leading-relaxed">{outputText}</p>
                ) : (
                  <p className="text-muted-foreground/60 text-sm italic">
                    Your {currentTool?.label.toLowerCase()} result will appear here...
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={handleProcess}
            disabled={!inputText.trim() || isProcessing}
            className="group flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all amber-glow"
          >
            {isProcessing ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4" />
                {currentTool?.label}
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </>
            )}
          </button>
        </div>

        {/* Feature Description */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground text-sm max-w-lg mx-auto">
            {currentTool?.description}. Simply paste your text, click the button, and watch the magic happen.
          </p>
        </div>
      </main>

    </div>
  );
}
