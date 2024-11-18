import { createBrowserRouter, Outlet } from "react-router-dom";
import Home from "./pages/Home";
import Store from "./pages/Store";
import { Navbar } from "./Navbar";
import Team from "./pages/Team";
import TeamMember from "./pages/TeamMember";
import { TeamNavbar } from "./TeamNavbar";

export const router = createBrowserRouter([
  {
    element: <NavLayout />,
    errorElement: <h1>Error</h1>,
    children: [
      { path: "/", element: <Home /> },
      { path: "/store", element: <Store /> },
      {
        path: "/team",
        element: <TeamLayout />,
        children: [
          { index: true, element: <Team /> },
          { path: "joe", element: <TeamMember name="joe" /> },
          { path: "sally", element: <TeamMember name="sally" /> },
        ],
      },
    ],
  },
]);

function NavLayout() {
  return (
    <>
      <Navbar />
      <Outlet   />
    </>
  );
}
function TeamLayout() {
  return (
    <>
      <TeamNavbar />
      <Outlet  context="Hi there" />
    </>
  );
}
