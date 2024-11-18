import { useContext, useRef, useState } from "react";
import { TodoContext } from "../store/Todo-Provider";

export function TodoItem({ id, complete, text }) {
  const { completeTodo, deleteTodo, editTodo } = useContext(TodoContext);
  const [isEdit, setIsEdit] = useState(false);

  const editInputRef = useRef();

  function editHandler() {
    if (!editInputRef.current.value || editInputRef.current.value.trim() === "")
      return;
    editTodo(id, editInputRef.current.value);
    setIsEdit(false);
  }
  return (
    <li className="list-item">
      {isEdit ? (
        <>
          <form onSubmit={editHandler}>
            <input ref={editInputRef} type="text" defaultValue={text} />
            <button data-button-save>Save</button>
          </form>
        </>
      ) : (
        <label className="list-item-label">
          <input
            type="checkbox"
            checked={complete}
            onChange={(e) => completeTodo(id, e.target.checked)}
            data-list-item-checkbox
          />
          <span data-list-item-text>{text}</span>
        </label>
      )}
      <button data-button-edit onClick={() => setIsEdit((p) => !p)}>
        Edit
      </button>

      <button data-button-delete onClick={() => deleteTodo(id)}>
        Delete
      </button>
    </li>
  );
}
