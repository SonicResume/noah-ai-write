interface ToneSelectorProps {
  tones: string[];
  selectedTone: string;
  onSelect: (tone: string) => void;
}

export function ToneSelector({ tones, selectedTone, onSelect }: ToneSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Choose a tone</h3>
      <div className="flex flex-wrap gap-2">
        {tones.map((tone) => (
          <button
            key={tone}
            onClick={() => onSelect(tone)}
            className={`
              px-3 py-1.5 rounded-full text-sm transition-all
              ${selectedTone === tone 
                ? "bg-secondary text-secondary-foreground border border-primary/50" 
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary"
              }
            `}
          >
            {tone}
          </button>
        ))}
      </div>
    </div>
  );
}
