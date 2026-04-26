import { OrganismResult } from '@/types';

const HISTORY_KEY = 'organa_history';
const MAX_HISTORY_ITEMS = 50;

export function getHistory(): OrganismResult[] {
  if (typeof window === 'undefined') return [];
  try {
    const data = localStorage.getItem(HISTORY_KEY);
    return data ? JSON.parse(data) : [];
  } catch {
    return [];
  }
}

export function addToHistory(result: OrganismResult): void {
  const history = getHistory();
  // Prevent duplicates
  if (history.some(item => item.id === result.id)) return;
  history.unshift(result);
  // Keep within limit
  while (history.length > MAX_HISTORY_ITEMS) {
    history.pop();
  }
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function removeFromHistory(id: string): void {
  const history = getHistory().filter(item => item.id !== id);
  localStorage.setItem(HISTORY_KEY, JSON.stringify(history));
}

export function clearHistory(): void {
  localStorage.removeItem(HISTORY_KEY);
}

export function getHistoryByType(type: string): OrganismResult[] {
  if (type === 'all') return getHistory();
  return getHistory().filter(item => item.type === type);
}
