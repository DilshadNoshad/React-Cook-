import { Link, useLoaderData } from "react-router-dom";
import { getUsers } from "../api/users";

export function Users() {
  const users = useLoaderData();

  console.log(users);
  return (
    <>
      <h1 className="page-title">Users</h1>
      <div className="card-grid">
        {users.map((user) => (
          <UserCard key={user.id} {...user} />
        ))}
      </div>
    </>
  );
}

export function UserCard({ id, name, email, website, company }) {
  return (
    <div className="card">
      <div className="card-header">{name}</div>
      <div className="card-body">
        <div>{company?.name}</div>
        <div>{website}</div>
        <div>{email}</div>
      </div>
      <div className="card-footer">
        <Link className="btn" to={id.toString()}>
          View
        </Link>
      </div>
    </div>
  );
}

function loader({ request: { signal } }) {
  return getUsers({ signal });
}

export const usersRoute = {
  loader,
  element: <Users />,
};
