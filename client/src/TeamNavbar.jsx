import { Link } from "react-router-dom";

export function TeamNavbar() {
  return (
    <ul>
      <li>
        <Link to="joe">Joe</Link>
      </li>
      <li>
        <Link to="sally">Sally</Link>
      </li>

      <li>
        <Link to="..">.. Route</Link>
      </li>

      <li>
        <Link to=".." relative="path" >
          .. Path
        </Link>
      </li>
      <li>
        <Link to=".">. Route</Link>
      </li>

      <li>
        <Link to="." relative="path" >
          . Path
        </Link>
      </li>
    </ul>
  );
}
