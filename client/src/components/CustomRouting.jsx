import { useEffect, useState } from "react";
import Home from "./pages/Home.Jsx";
import Store from "./pages/Store";

export function CustomRouting() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);

  let component;

  switch (currentPath) {
    case "/":
      component = <Home />;
      break;
    case "/store":
      component = <Store />;
      break;
  }

  function navigateHandler(path) {
    history.pushState(null, "", path);
    setCurrentPath(path);
  }

  useEffect(() => {
    const onLocationChange = () => {
      setCurrentPath(window.location.pathname);
    };

    window.addEventListener("popstate", onLocationChange);
    return () => window.removeEventListener("popstate", onLocationChange);
  }, []);

  return (
    <>
      <ul>
        <li>
          <a data-btn-link onClick={() => navigateHandler("/")}>
            Home
          </a>
        </li>
        <li>
          <a data-btn-link onClick={() => navigateHandler("/store")}>
            Store
          </a>
        </li>
      </ul>
      {component}
    </>
  );
}
