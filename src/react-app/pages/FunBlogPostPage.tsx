import React, { useState, useEffect } from "react";
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  User, 
  RefreshCw, 
  Expand, 
  FileText, 
  CheckCircle, 
  MessageSquare, 
  Languages, 
  Sparkles,
  Rocket,
  Code
} from "lucide-react";

export default function FunBlogPostPage() {
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    document.title = "Building an AI Text Workspace in React | AIWrite Blog";
  }, []);

  return (
    <div className="min-h-screen bg-[#FFFDF9] text-[#4A2E2B] antialiased font-sans selection:bg-orange-200">
      
      {/* Playful Floating Pattern Header Banner */}
      <div className="h-4 bg-gradient-to-r from-orange-500 via-amber-600 to-orange-400 w-full" />

      <div className="max-w-3xl mx-auto px-4 py-12">
        
        {/* Fun Back Button */}
        <a href="/blog" className="inline-flex items-center gap-2 text-sm font-bold text-orange-600 hover:text-orange-700 transition-transform hover:-translate-x-1 mb-8 bg-orange-50 px-3 py-1.5 rounded-full">
          <ArrowLeft className="w-4 h-4" /> Back to the safe zone
        </a>

        {/* Dynamic Header */}
        <header className="space-y-6 mb-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-100 text-amber-900 rounded-full text-xs font-bold uppercase tracking-wider shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-orange-600" /> Code Tutorial
          </div>
          
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-[#361E1B] leading-tight">
            Building an AI Text Workspace in React: <span className="text-orange-600 underline decoration-wavy decoration-amber-500">State, Files, & Magic API Links!</span>
          </h1>
          
          {/* Metadata Badges */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 text-xs font-semibold text-[#6E4A45]">
            <div className="flex items-center gap-1.5 bg-[#F5EDE0] px-3 py-1.5 rounded-xl border border-[#E8DCBF]">
              <User className="w-3.5 h-3.5 text-orange-500" />
              <span>AIWrite Wizards</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F5EDE0] px-3 py-1.5 rounded-xl border border-[#E8DCBF]">
              <Calendar className="w-3.5 h-3.5 text-orange-500" />
              <span>June 5, 2026</span>
            </div>
            <div className="flex items-center gap-1.5 bg-[#F5EDE0] px-3 py-1.5 rounded-xl border border-[#E8DCBF]">
              <Clock className="w-3.5 h-3.5 text-orange-500" />
              <span>5 min of fun</span>
            </div>
          </div>
        </header>

        {/* Featured Image Display Anchor */}
        <div className="relative aspect-video w-full rounded-3xl overflow-hidden shadow-xl mb-12 border-4 border-orange-500">
         <img
           src="/images/aiwrite-fun-workspace.png"
           alt="AIWrite playful design workspace with bright orange tools and cute retro brown aesthetic layouts"
           className="object-cover w-full h-full"
         />
        </div>

        {/* Article Body */}
        <div className="space-y-8 text-base md:text-lg leading-relaxed text-[#4A2E2B]">
          <p className="text-xl font-medium text-[#361E1B]">
            AI engines are like raw fuel—incredibly strong, but completely useless without a steering wheel! To give your writers a journey they will actually enjoy, your interface has to stay light on its feet.
          </p>

          <p>
            Today, we are popping open the hood of <strong>AIWrite</strong> to look at its core React + TypeScript component. We will see how it shuffles data states, reads user text files securely right inside the browser, and bundles outbound payloads up for server processing.
          </p>

          {/* Quick Tool Grid */}
          <div className="bg-[#F5EDE0] border-2 border-[#361E1B] rounded-2xl p-6 my-8 shadow-[4px_4px_0px_0px_#361E1B]">
            <h3 className="font-black text-xl mb-4 text-[#361E1B] flex items-center gap-2">
              <Rocket className="w-5 h-5 text-orange-600" /> The 6 Core Tools We Pack:
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label: "Rewrite", icon: RefreshCw },
                { label: "Expand", icon: Expand },
                { label: "Summarize", icon: FileText },
                { label: "Fix Grammar", icon: CheckCircle },
                { label: "Change Tone", icon: MessageSquare },
                { label: "Translate", icon: Languages },
              ].map((item, index) => (
                <div key={index} className="bg-white border-2 border-[#361E1B] p-3 rounded-xl flex flex-col items-center text-center shadow-[2px_2px_0px_0px_#361E1B] hover:-translate-y-0.5 transition-transform">
                  <item.icon className="w-6 h-6 text-orange-500 mb-1" />
                  <span className="text-xs font-bold">{item.label}</span>
                </div>
              ))}
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#361E1B] flex items-center gap-2 pt-4">
            <Code className="w-6 h-6 text-orange-600" /> The Architecture Trick
          </h2>
          <p>
            Instead of over-complicating state data trees, we hook custom selectors directly up to atomic pieces of state. This stops layout rendering blocks from stuttering when people paste huge manuscripts. 
          </p>
          <p>
            When a user uploads a text document, a fast <code className="bg-orange-100 px-1.5 py-0.5 rounded text-orange-800 text-sm font-mono font-bold">FileReader()</code> intercepts the stream instantly on the client side, running security file checks before it even hits your cloud backend database systems!
          </p>

          {/* Call to Action Footer Box */}
          <footer className="mt-12 p-8 bg-gradient-to-br from-[#361E1B] to-[#54302B] rounded-3xl text-white space-y-6 shadow-xl relative overflow-hidden group">
            <div className="absolute right-0 bottom-0 translate-x-4 translate-y-4 opacity-10 font-black text-9xl pointer-events-none select-none">AI</div>
            <h3 className="text-2xl font-black tracking-tight text-orange-400">Want to look under the entire dashboard panel hood?</h3>
            <p className="text-orange-100/90 text-sm max-w-xl">
              Grab our complete code repository kit to play with pre-styled Tailwind workspace themes, automated character limit caps, and custom utility states.
            </p>
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button className="bg-orange-500 hover:bg-orange-400 text-white font-bold px-6 py-3 rounded-xl text-sm transition-all transform hover:-translate-y-0.5 active:translate-y-0 shadow-[0_4px_14px_rgba(249,115,22,0.4)]">
                Grab Code Pack 🚀
              </button>
              <button 
                onClick={() => setLikes(l => l + 1)} 
                className="bg-transparent border-2 border-orange-400/40 hover:border-orange-400 px-4 py-2.5 rounded-xl font-bold text-xs transition-colors flex items-center gap-2 text-orange-300"
              >
                ❤️ High Five! ({likes})
              </button>
            </div>
          </footer>

        </div>
      </div>
    </div>
  );
}
