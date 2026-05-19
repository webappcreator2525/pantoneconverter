import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const LS_KEY = 'pantone-favorites';

function readStorage() {
  if (typeof window === 'undefined') return [];
  try { return JSON.parse(localStorage.getItem(LS_KEY) || '[]'); } catch { return []; }
}

function writeStorage(favs) {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LS_KEY, JSON.stringify(favs));
  }
}

// ── Context ──────────────────────────────────────────────────────
const FavoritesContext = createContext(null);

// ── Provider — mount once in _app.jsx ───────────────────────────
export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  // Hydrate once on client
  useEffect(() => { setFavorites(readStorage()); }, []);

  const isSaved = useCallback(
    (name) => favorites.some((f) => f.name === name),
    [favorites]
  );

  const toggleFavorite = useCallback((colorObj) => {
    setFavorites((prev) => {
      const exists = prev.some((f) => f.name === colorObj.name);
      const next = exists
        ? prev.filter((f) => f.name !== colorObj.name)
        : [...prev, colorObj];
      writeStorage(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    writeStorage([]);
    setFavorites([]);
  }, []);

  return (
    <FavoritesContext.Provider
      value={{ favorites, isSaved, toggleFavorite, clearAll, count: favorites.length }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// ── Hook — use anywhere; reads from the shared context ──────────
export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used inside <FavoritesProvider>');
  return ctx;
}
