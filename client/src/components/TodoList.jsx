import { useContext } from "react";
import { TodoItem } from "./TodoItem";
import { TodoContext } from "../store/Todo-Provider";

export function TodoList() {
  const { todos } = useContext(TodoContext);
  return (
    <ul id="list">
      {todos.map((t) => {
        return <TodoItem key={t.id} {...t} />;
      })}
    </ul>
  );
}
