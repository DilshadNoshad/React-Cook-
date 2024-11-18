import { useContext } from "react";
import { TodoContext } from "../store/Todo-Provider";

export function TodoFormFilter() {
  const { hideCompleted, setHideCompleted, setSearchFilter, searchFilter } =
    useContext(TodoContext);
  return (
    <div className="filter-form">
      <div className="filter-form-group">
        <label htmlFor="name">Name</label>
        <input
          type="text"
          value={searchFilter}
          onChange={(e) => setSearchFilter(e.target.value)}
          id="name"
        />
      </div>
      <label>
        <input
          type="checkbox"
          checked={hideCompleted}
          onChange={(e) => setHideCompleted(e.target.checked)}
        />
        Hide Completed
      </label>
    </div>
  );
}
