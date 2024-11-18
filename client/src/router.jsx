import { createBrowserRouter, Navigate } from "react-router-dom";
import { MainLayout } from "./MainLayout";
import { postsRoute } from "./pages/Posts";
import { usersRoute } from "./pages/Users";
import { todosRoute } from "./pages/Todos";
import { postRoute } from "./pages/Post";
import { userRoute } from "./pages/User";
import { Error } from "./pages/Error";
import { newTodoRoute } from "./pages/NewTodo";
import { newPostRoute } from "./pages/NewPost";
import { editPostRoute } from "./pages/EditPost";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        errorElement: <Error />,
        children: [
          { index: true, element: <Navigate to="/posts" /> },
          {
            path: "posts",
            children: [
              {
                index: true,
                ...postsRoute,
              },
              {
                path: ":postId",
                children: [
                  { index: true, ...postRoute },
                  { path: "edit", ...editPostRoute },
                ],
              },
              { path: "new", ...newPostRoute },
            ],
          },
          {
            path: "users",
            children: [
              {
                index: true,
                ...usersRoute,
              },
              {
                path: ":userId",
                ...userRoute,
              },
            ],
          },
          {
            path: "todos",
            children: [
              { index: true, ...todosRoute },
              { path: "new", ...newTodoRoute },
            ],
          },
          { path: "*", element: <h1>404 - Not found</h1> },
        ],
      },
    ],
  },
]);
