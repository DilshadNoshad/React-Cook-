import { useCallback, useState } from "react";

export function useArray(initialArray) {
  const [array, setArray] = useState(initialArray);

  const push = useCallback((elemToAdd) => {
    setArray((currentState) => [...currentState, elemToAdd]);
  }, []);

  // this function create only one time if parent use useeffect or not
  // also no need to write setArray which return from useState as a dependency bcz it is never recreate

  const clear = useCallback(() => {
    setArray([]);
  }, []);

  const reset = useCallback(() => {
    setArray(initialArray);
  }, [initialArray]);

  const filter = useCallback((callback) => {
    setArray((currentState) => currentState.filter(callback));
  }, []);

  const remove = useCallback((index) => {
    setArray((currentState) => [
      ...currentState.slice(0, index),
      ...currentState.slice(index + 1),
    ]);
  }, []);

  const replace = useCallback((index, newElem) => {
    setArray((currentState) => [
      ...currentState.slice(0, index),
      newElem,
      ...currentState.slice(index + 1),
    ]);
  }, []);

  return { array, set: setArray, clear, reset, push, filter, remove, replace };
}
