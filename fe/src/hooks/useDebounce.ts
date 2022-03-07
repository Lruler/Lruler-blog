import { useEffect, DependencyList, useCallback } from "react";

export const useDebouncedEffect = (
  effect: (...args: any[]) => any,
  delay: number,
  deps: DependencyList
) => {
  const callback = useCallback(effect, deps);

  useEffect(() => {
    const handler = setTimeout(() => {
      callback();
    }, delay);

    return () => {
      clearTimeout(handler);
    }; 
  }, [callback, delay]);

  return callback
};
