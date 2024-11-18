import { Link, useLoaderData } from "react-router-dom";
import { getUser } from "../api/users";
import { getPosts } from "../api/posts";
import { getTodos } from "../api/todos";

 function User() {
  const {
    posts,
    todos,
    user: { email, name, address, website, company },
  } = useLoaderData();
  return (
    <>
      <h1 className="page-title">{name}</h1>
      <div className="page-subtitle">{email}</div>
      <div>
        <b>Company:</b> {company?.name}
      </div>
      <div>
        <b>Website:</b> {website}
      </div>
      <div>
        <b>Address:</b> {address?.street} {address?.suite}, {address?.city},
        {address.zipcode}
      </div>
      <h3 className="mt-4 mb-2">Posts</h3>
      <div className="card-grid">
        
      {posts.map((post) => {
          return <PostCard key={post.id} {...post} />;
        })}
        
      </div>
      <h3 className="mt-4 mb-2">Todos</h3>
      <ul>
      {todos.map((todo) => {
          return (
            <li
              key={todo.id}
              className={todo.completed ? "strike-through" : ""}
            >
              {todo.title}
            </li>
          );
        })}
      </ul>
    </>
  );
}


function PostCard({ id, title, body }) {
  return (
    <div className="card">
      <div className="card-header">{title}</div>
      <div className="card-body">
        <div className="card-preview-text">{body}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={`/posts/${id}`}>
          View
        </Link>
      </div>
    </div>
  );
}



async function loader({ params : { userId }, request: { signal } }) {
  const posts = getPosts({ signal, params: { userId } })
  const todos = getTodos({ signal, params: { userId } })
  const user = getUser(userId, { signal })

  return { posts: await posts, todos: await todos, user: await user }
}

export const userRoute = {
  loader,
  element: <User />,
};


