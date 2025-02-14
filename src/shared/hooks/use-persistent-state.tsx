import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function usePersistentState<T>(
  key: string,
  initialValue?: T,
): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = localStorage.getItem(key);
      return storedValue !== null ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      console.error("Error reading localStorage key", key, error);
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      if (state !== null && state !== undefined) {
        localStorage.setItem(key, JSON.stringify(state));
      } else {
        localStorage.removeItem(key);
      }
    } catch (error) {
      console.error("Error saving to localStorage", key, error);
    }
  }, [key, state]);

  return [state, setState];
}
