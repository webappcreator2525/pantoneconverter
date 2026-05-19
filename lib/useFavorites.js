import { useState, useEffect, useCallback } from 'react';

const LS_KEY = 'pantone-favorites';

function readFavorites() {
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || '[]');
  } catch {
    return [];
  }
}

function writeFavorites(favs) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LS_KEY, JSON.stringify(favs));
}

/**
 * Hook: useFavorites()
 * Returns { favorites, isSaved, toggleFavorite, clearAll, count }
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState([]);

  // Hydrate from localStorage on mount
  useEffect(() => {
    setFavorites(readFavorites());
  }, []);

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
      writeFavorites(next);
      return next;
    });
  }, []);

  const clearAll = useCallback(() => {
    writeFavorites([]);
    setFavorites([]);
  }, []);

  return { favorites, isSaved, toggleFavorite, clearAll, count: favorites.length };
}
