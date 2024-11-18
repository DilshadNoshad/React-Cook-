import { TodoFormFilter } from "./TodoFormFilter";
import { ToDoFormNew } from "./ToDoFormNew";
import { TodoList } from "./TodoList";

export function TODOFORM() {
  return (
    <>
      <TodoFormFilter />
      <TodoList />
      <ToDoFormNew />
    </>
  );
}
