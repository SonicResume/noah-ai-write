import { Book, BookOpen } from "lucide-react";
import {
  FileText,
  FileBarChart
} from "lucide-react";

const contentTypes = [
  { id: "blog", label: "Blog", icon: FileText },
  { id: "article", label: "Article", icon: FileText },
  { id: "essay", label: "Essay", icon: FileText },
  { id: "guide", label: "Guide", icon: Book },
  { id: "report", label: "Report", icon: FileBarChart },
  { id: "ebook", label: "eBook", icon: BookOpen },
];

interface ContentTypeSelectorProps {
  selectedType: string;
  onSelect: (type: string) => void;
}

export function ContentTypeSelector({ selectedType, onSelect }: ContentTypeSelectorProps) {
  return (
    <div className="mb-6">
      <h2 className="text-sm font-medium text-muted-foreground mb-3 uppercase tracking-wider">
        Content Type
      </h2>
      <div className="flex flex-wrap gap-2">
        {contentTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;
          return (
            <button
              key={type.id}
              onClick={() => onSelect(type.id)}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                isSelected
                  ? "bg-primary/15 text-primary border border-primary/30"
                  : "bg-card border border-border text-muted-foreground hover:text-foreground hover:border-border/80"
              }`}
            >
              <Icon className="w-4 h-4" />
              {type.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { contentTypes };
