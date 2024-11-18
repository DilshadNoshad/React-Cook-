import { createContext, useEffect, useReducer, useState } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";
export const TodoContext = createContext();

const TODO_LOCAL_STORAGE_KEY = "ADVANCED_TODOS";
const TOGGLE_COMPLETED_LOCAL_STORAGE_KEY = "TOGGLE_COMPLETED";

const ACTIONS = {
  ADD_TODO: "add_todo",
  UPDATE_TODO: "update_todo",
  DELETE_TODO: "delete_todo",
  COMPLETE_TODO: "complete_todo",
  TOGGLE_COMPLETED_TODOS: "toggle_complete_todos",
};

function reducer(state, { type, payload }) {
  switch (type) {
    case ACTIONS.ADD_TODO:
      return [
        ...state,
        {
          id: crypto.randomUUID(),
          text: payload.todo,
          complete: false,
        },
      ];
    case ACTIONS.UPDATE_TODO:
      return state.map((t) => {
        if (t.id === payload.id) return { ...t, text: payload.text };
        return t;
      });
    case ACTIONS.DELETE_TODO:
      return state.filter((i) => i.id !== payload.id);
    case ACTIONS.COMPLETE_TODO:
      return state.map((t) => {
        if (t.id === payload.id) return { ...t, complete: payload.complete };
        return t;
      });
    default:
      throw new Error(`no action found for ${type}`);
  }
}

export function TodoProvider({ children }) {
  const [todos, dispatch] = useReducer(reducer, [], (initialData) => {
    const localValue = localStorage.getItem(TODO_LOCAL_STORAGE_KEY);
    if (localValue != null) {
      return JSON.parse(localValue);
    }
    return initialData;
  });

  const [hideCompleted, setHideCompleted] = useLocalStorage(
    TOGGLE_COMPLETED_LOCAL_STORAGE_KEY,
    false
  );
  
  const [searchFilter, setSearchFilter] = useState("");

  const filterTodos = todos.filter((todo) => {
    if (hideCompleted && todo.complete) return false;
    return todo?.text
      ?.toLowerCase()
      ?.includes(searchFilter?.trim()?.toLowerCase());
  });

  function addingTodo(todo) {
    dispatch({ type: ACTIONS.ADD_TODO, payload: { todo } });
  }
  function deleteTodo(id) {
    dispatch({ type: ACTIONS.DELETE_TODO, payload: { id } });
  }

  function completeTodo(id, complete) {
    dispatch({ type: ACTIONS.COMPLETE_TODO, payload: { id, complete } });
  }
  function editTodo(id, text) {
    dispatch({ type: ACTIONS.UPDATE_TODO, payload: { id, text } });
  }

  useEffect(() => {
    if (todos === undefined) {
      localStorage.removeItem(TODO_LOCAL_STORAGE_KEY);
    } else {
      localStorage.setItem(TODO_LOCAL_STORAGE_KEY, JSON.stringify(todos));
    }
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos: filterTodos,
        hideCompleted,
        setHideCompleted,
        searchFilter,
        setSearchFilter,
        addingTodo,
        deleteTodo,
        completeTodo,
        editTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
}
