import { Link, useLoaderData } from "react-router-dom";
import { getPost } from "../api/posts";
import { getComments } from "../api/comments";
import { getUser } from "../api/users";

export function Post() {
  const {
    post: { body, title, userId },
    user,
    comments,
  } = useLoaderData();

  console.log(user);
  return (
    <>
      <h1 className="page-title">
        {title}
        <div className="title-btns">
          <Link className="btn btn-outline" to="edit">
            Edit
          </Link>
        </div>
      </h1>
      <span className="page-subtitle">
        By: <Link to={`/users/${userId}`}>{user?.name}</Link>
      </span>
      <div>{body}</div>
      <h3 className="mt-4 mb-2">Comments</h3>
      <div className="card-stack">
        {comments.map((comment) => {
          return (
            <div key={comment.id} className="card">
              <div className="card-body">
                <div className="text-sm mb-1">{comment.email}</div>
                {comment.body}
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

async function loader({ params, request: { signal } }) {
  const post = await getPost(params.postId, { signal });
  const user = getUser(post.userId, { signal });
  const comments = getComments(params.postId, { signal });
  return { comments: await comments, post, user: await user };
}

export const postRoute = {
  loader,
  element: <Post />,
};
