import {
  Form,
  Link,
  redirect,
  useActionData,
  useNavigation,
} from "react-router-dom";
import { addTodo } from "../api/todos";

export function NewTodo() {
  const errorMessage = useActionData();
  const { state } = useNavigation();

  const isSubmitting = state === "submitting" || state === "loading";
  return (
    <div className="container">
      <h1 className="page-title">New Todo</h1>

      <Form method="POST" className="form">
        <div style={{ color: "red" }}>{errorMessage}</div>
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" />
          </div>
        </div>
        <div className="form-btn-row form-row">
          <Link to=".." className="btn btn-outline">
            Back
          </Link>
          <button disabled={isSubmitting} className="btn">
            {isSubmitting ? "Loading" : "Create"}
          </button>
        </div>
      </Form>
    </div>
  );
}

async function action({ request }) {
  const formData = await request.formData();
  const title = formData.get("title");

  if (title?.trim() === "") {
    return "Title is required.";
  }

  await addTodo(
    { title, completed: false },
    {
      signal: request.signal,
    }
  );

  // console.log(todo);

  return redirect("/todos");
}

export const newTodoRoute = {
  element: <NewTodo />,
  action,
};
