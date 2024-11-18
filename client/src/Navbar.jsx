import { Link } from "react-router-dom";

export function Navbar() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/store">Store</Link>
      </li>
      <li>
        <Link to="/team">Team</Link>
      </li>
    </ul>
  );
}


