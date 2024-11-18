import { useContext, useRef } from "react";
import { TodoContext } from "../store/Todo-Provider";

export function ToDoFormNew() {
  const todoRef = useRef();
  const { addingTodo } = useContext(TodoContext);

  function todoHandle(e) {
    e.preventDefault();
    if (!todoRef.current.value || todoRef.current.value.trim() === "") return;
    addingTodo(todoRef.current.value);
    todoRef.current.value = "";
  }
  return (
    <form onSubmit={todoHandle} id="new-todo-form">
      <label htmlFor="todo-input">New Todo</label>
      <input autoFocus type="text" id="todo-input" ref={todoRef} />
      <button>Add Todo</button>
    </form>
  );
}
