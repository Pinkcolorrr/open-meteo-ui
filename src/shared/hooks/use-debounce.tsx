export function useDebounce<T extends unknown[]>(callback: (...args: T) => unknown, timeout = 500) {
  let timer: number;

  return (...args: T) => {
    clearTimeout(timer);
    timer = window.setTimeout(() => callback(...args), timeout);
  };
}
