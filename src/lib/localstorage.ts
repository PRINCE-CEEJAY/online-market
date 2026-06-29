import type { RootState } from '../app/store';

const STORAGE_KEY = 'online-market-redux-state';

export function loadState() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : undefined;
  } catch (error) {
    console.log(error);
    return undefined;
  }
}

export function saveState(state: RootState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.log(error);
    return undefined;
  }
}
