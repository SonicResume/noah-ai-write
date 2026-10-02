interface LanguageSelectorProps {
  languages: string[];
  selectedLanguage: string;
  onSelect: (language: string) => void;
}

export function LanguageSelector({ languages, selectedLanguage, onSelect }: LanguageSelectorProps) {
  return (
    <div className="mb-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-3">Translate to</h3>
      <div className="flex flex-wrap gap-2">
        {languages.map((language) => (
          <button
            key={language}
            onClick={() => onSelect(language)}
            className={`
              px-3 py-1.5 rounded-full text-sm transition-all
              ${selectedLanguage === language 
                ? "bg-secondary text-secondary-foreground border border-primary/50" 
                : "bg-muted text-muted-foreground hover:text-foreground hover:bg-secondary"
              }
            `}
          >
            {language}
          </button>
        ))}
      </div>
    </div>
  );
}
