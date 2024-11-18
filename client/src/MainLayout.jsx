import {
  Link,
  NavLink,
  Outlet,
  ScrollRestoration,
  useNavigation,
} from "react-router-dom";

export function MainLayout() {
  const { state } = useNavigation();

  const isLoading = state === "loading";
  return (
    <>
      <nav className="top-nav">
        <div className="nav-text-large">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
            My APP
          </Link>
        </div>
        <ul className="nav-list">
          <li>
            <NavLink to="posts" end>Posts</NavLink>
          </li>
          <li>
            <NavLink to="users" end>Users</NavLink>
          </li>
          <li>
            <NavLink to="todos" end>Todos</NavLink>
          </li>
        </ul>
      </nav>
      <ScrollRestoration />
      {isLoading && <div className="loading-spinner"></div>}
      <div className={`container ${isLoading ? "loading" : ""} `}>
        <Outlet />
      </div>
    
    </>
  );
}
