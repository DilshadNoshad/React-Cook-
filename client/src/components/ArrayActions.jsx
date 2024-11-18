import { useArray } from "../hooks/useArray";

const INITIAL_ARRAY = () => [1, 2, 3];
export function ArrayActions() {
  const { array, set, clear, reset, push, filter, remove, replace } = useArray(INITIAL_ARRAY);
  return (
    <>
      <p>{array.join(", ")}</p>

      <button onClick={() => set([4, 5, 6])}>set to [4,5,6]</button>
      <br />
      <br />
      <button onClick={() => replace(1, 9)}>replace second element to 9</button>
      <br />
      <br />
      <button onClick={() => push(4)}>push 4</button>
      <br />
      <br />
      <button onClick={() => filter((n) => n < 3)}>keep numbers less than 3</button>
      <br />
      <br />
      <button onClick={()=>remove(1)}>remove second element</button>
      <br />
      <br />
      <button onClick={clear}>clear</button>
      <br />
      <br />
      <button onClick={reset}>reset</button>
    </>
  );
}
