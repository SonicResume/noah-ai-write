import { LucideIcon } from "lucide-react";

interface Tool {
  id: string;
  label: string;
  icon: LucideIcon;
  description: string;
}

interface ToolButtonProps {
  tool: Tool;
  isSelected: boolean;
  onClick: () => void;
}

export function ToolButton({ tool, isSelected, onClick }: ToolButtonProps) {
  const Icon = tool.icon;
  
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center gap-2 px-4 py-2.5 rounded-full text-sm font-medium transition-all
        ${isSelected 
          ? "bg-primary text-primary-foreground shadow-md amber-glow" 
          : "bg-card border border-border text-foreground hover:bg-accent hover:border-primary/30"
        }
      `}
    >
      <Icon className="w-4 h-4" />
      {tool.label}
    </button>
  );
}
