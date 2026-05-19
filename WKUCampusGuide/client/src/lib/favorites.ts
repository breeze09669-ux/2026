import { type Favorite } from '@shared/schema';

const FAVORITES_KEY = 'campus-tour-favorites';

export function getFavorites(): Favorite[] {
  const stored = localStorage.getItem(FAVORITES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function addFavorite(menuId: string, restaurantId: string): void {
  const favorites = getFavorites();
  const exists = favorites.some(f => f.menuId === menuId);
  if (exists) return;
  
  const newFavorite: Favorite = {
    id: crypto.randomUUID(),
    menuId,
    restaurantId,
    timestamp: Date.now(),
  };
  
  favorites.push(newFavorite);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  
  // Dispatch custom event for reactivity
  window.dispatchEvent(new CustomEvent('favorites-changed'));
}

export function removeFavorite(menuId: string): void {
  const favorites = getFavorites();
  const filtered = favorites.filter(f => f.menuId !== menuId);
  localStorage.setItem(FAVORITES_KEY, JSON.stringify(filtered));
  
  // Dispatch custom event for reactivity
  window.dispatchEvent(new CustomEvent('favorites-changed'));
}

export function isFavorite(menuId: string): boolean {
  const favorites = getFavorites();
  return favorites.some(f => f.menuId === menuId);
}
