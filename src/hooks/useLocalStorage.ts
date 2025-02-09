import { useState, useEffect } from 'react';

export const useLocalStorage = (key: string, initialValue: string) => {
  const [storedValue, setStoredValue] = useState<string>(() => {
    const item = localStorage.getItem(key);
    return item ? item : initialValue;
  });

  useEffect(() => {
    if (storedValue !== null) {
      localStorage.setItem(key, storedValue);
    }
  }, [storedValue, key]);

  return [storedValue, setStoredValue] as const;
};
