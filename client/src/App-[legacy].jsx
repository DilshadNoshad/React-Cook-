import { Navbar } from "./Navbar";
import Home from "./pages/Home.Jsx";
import Store from "./pages/Store";

export function App() {
  let component;

  switch (window.location.pathname) {
    case "/":
      component = <Home />;
      break;
    case "/store":
      component = <Store />;
      break;
  }

  return (
    <>
      <Navbar />
      {component}
    </>
  );
}
