import { Form, Link, useLoaderData, useNavigation } from "react-router-dom";
import { getTodos } from "../api/todos";
import { useEffect, useRef } from "react";

export function Todos() {
  const { query, todos } = useLoaderData();
  const { state } = useNavigation();
  const queryRef = useRef();

  const isLoading = state === "loading";

  useEffect(() => {
    queryRef.current.value = query;
  }, [query]);

  return (
    <>
      <h1 className="page-title mb-2">
        Todos
        <div className="title-btns">
          <Link to="new" className="btn">
            New
          </Link>
        </div>
      </h1>
      <Form className="form" method="get">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="query">Search</label>
            <input type="search" id="query" name="query" ref={queryRef} />
          </div>
          <button className="btn">Search</button>
        </div>
      </Form>
      {isLoading ? (
        "loading..."
      ) : (
        <ul>
          {todos.map((todo) => {
            return (
              <li
                key={todo.id}
                className={todo.completed ? "strike-through" : undefined}
              >
                {todo.title}
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}

async function loader({ request: { signal, url } }) {
  const searchParams = new URL(url).searchParams;
  const query = searchParams.get("query") || "";
  return { query, todos: await getTodos(query, { signal }) };
}

export const todosRoute = {
  loader,
  element: <Todos />,
};
