import  { useEffect, useState } from "react";

export function ClassComponent() {
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);

  useEffect(() => console.log("Render"));

  useEffect(() => {
    console.log("Hi");

    return () => {
      console.log("bye");
    };
  }, []);

  useEffect(() => {
    console.log(`My name is ${name} and I am ${age} years old`);
  }, [name, age]);

  useEffect(() => {
    document.title = name;
  }, [name]);

  useEffect(() => {
    if (name === "") return;

    const delay = setTimeout(() => {
      console.log(name);
    }, 1000);

    return () => {
      clearTimeout(delay);
    };
  }, [name]);

  return (
    <>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <br />
      <br />
      <button onClick={() => setAge((currentValue) => currentValue - 1)}>
        -
      </button>
      <span>{age}</span>
      <button onClick={() => setAge((currentValue) => currentValue + 1)}>
        +
      </button>
      <br />
      <br />
      <p>
        My name is {name} and I m {age} years old.
      </p>
    </>
  );
}
