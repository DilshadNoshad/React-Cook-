import {
  Form,
  Link,
  redirect,
  useActionData,
  useLoaderData,
  useNavigation,
} from "react-router-dom";
import { getUsers } from "../api/users";
import { getPost, updatePost } from "../api/posts";
import { postValidation } from "../util/util-func";

export function EditPost() {
  const { post, users } = useLoaderData();
  const { state } = useNavigation();
  const errors = useActionData();
  const isSubmitting = state === "submitting";
  return (
    <>
      <h1 className="page-title">Edit Post</h1>
      <PostForm
        users={users}
        isSubmitting={isSubmitting}
        errors={errors}
        defaultValues={post}
      />
    </>
  );
}

function PostForm({ users, isSubmitting, errors = {}, defaultValues = {} }) {
  return (
    <Form method="post" className="form">
      <div className="form-row">
        <FormGroup errorMessage={errors.title}>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={defaultValues.title}
          />
        </FormGroup>
        <FormGroup errorMessage={errors.userId}>
          <label htmlFor="userId">Author</label>
          <select name="userId" id="userId" defaultValue={defaultValues.userId}>
            {users.map((user) => {
              return (
                <option key={user.id} value={user.id}>
                  {user.name}
                </option>
              );
            })}
          </select>
        </FormGroup>
      </div>
      <div className="form-row">
        <FormGroup errorMessage={errors.body}>
          <label htmlFor="body">Body</label>
          <textarea name="body" id="body" defaultValue={defaultValues.body} />
        </FormGroup>
      </div>
      <div className="form-row form-btn-row">
        <Link className="btn btn-outline" to="..">
          Cancel
        </Link>
        <button disabled={isSubmitting} className="btn">
          {isSubmitting ? "Saving" : "Save"}
        </button>
      </div>
    </Form>
  );
}

function FormGroup({ children, errorMessage }) {
  return (
    <div className={`form-group ${errorMessage != null ? "error" : ""}`}>
      {children}
      {errorMessage != null && (
        <div className="error-message">{errorMessage}</div>
      )}
    </div>
  );
}

async function action({ request, params }) {
  const formData = await request.formData();
  const title = formData.get("title");
  const body = formData.get("body");
  const userId = formData.get("userId");

  const errors = postValidation({ title, body, userId });

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  const post = await updatePost(
    params.postId,
    { title, userId, body },
    { signal: request.signal }
  );

  return redirect(`/posts/${post.id}`);
}

async function loader({ params, request: { signal } }) {
  const users = getUsers({ signal });
  const post = getPost(params.postId, { signal });

  return { users: await users, post: await post };
}

export const editPostRoute = {
  element: <EditPost />,
  loader,
  action,
};
