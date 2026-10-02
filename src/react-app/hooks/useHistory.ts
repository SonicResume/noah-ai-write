import { useEffect, useState } from 'react';

export interface HistoryEntry {
  id: string;
  text: string;
  confidence: number;
  source: 'tesseract' | 'tf' | 'combined';
  timestamp: number;
  imageData?: string;
  kind?: 'ocr' | 'image';
}

const STORAGE_KEY = 'scribelens:history';
/** Keep localStorage bounded even for long-running sessions. */
const MAX_ENTRIES = 50;

function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    // Corrupt JSON, or localStorage unavailable (private browsing, etc.)
    return [];
  }
}

/**
 * Session history, persisted to localStorage. Previously this lived only
 * in React state, so a page refresh silently discarded every past result
 * -- a documented limitation that this hook removes.
 */
export function useHistory() {
  const [history, setHistory] = useState<HistoryEntry[]>(() => loadHistory());

  useEffect(() => {
  const reloadHistory = () => {
    setHistory(loadHistory());
  };

  window.addEventListener("scribelens-history-updated", reloadHistory);

  return () => {
    window.removeEventListener(
      "scribelens-history-updated",
      reloadHistory
    );
  };
}, []);

const addEntry = (entry: Omit<HistoryEntry, 'id' | 'timestamp'>) => {
  const newEntry: HistoryEntry = {
    ...entry,
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    timestamp: Date.now(),
  };

  setHistory((prev) => [newEntry, ...prev].slice(0, MAX_ENTRIES));
};

const removeEntry = (id: string) => {
  setHistory((prev) => {
    const next = prev.filter((entry) => entry.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return next;
  });
};

const clearHistory = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
  setHistory([]);
};

return { history, addEntry, removeEntry, clearHistory };
}