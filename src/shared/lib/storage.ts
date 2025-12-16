type StorageKey = 'accessToken' | 'refreshToken' | 'user';

const isClient = () => typeof window !== 'undefined';

const getString = (key: StorageKey): string | null => {
  if (!isClient()) return null;
  try {
    return localStorage.getItem(key);
  } catch (error) {
    console.error(`Error getting item ${key} from storage:`, error);
    return null;
  }
};

const setString = (key: StorageKey, value: string): void => {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, value);
  } catch (error) {
    console.error(`Error setting item ${key} to storage:`, error);
  }
};

const getObject = <T>(key: StorageKey): T | null => {
  if (!isClient()) return null;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting object ${key} from storage:`, error);
    return null;
  }
};

const setObject = <T>(key: StorageKey, value: T): void => {
  if (!isClient()) return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting object ${key} to storage:`, error);
  }
};

const remove = (key: StorageKey): void => {
  if (!isClient()) return;
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from storage:`, error);
  }
};

const clear = (): void => {
  if (!isClient()) return;
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing storage:', error);
  }
};

export const storage = {
  getString,
  setString,
  getObject,
  setObject,
  remove,
  clear,
};
