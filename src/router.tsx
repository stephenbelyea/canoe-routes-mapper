import { createBrowserRouter } from "react-router";
import { Overview } from "./views";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Overview />,
      errorElement: <Overview />,
    },
  ],
  { basename: "/canoe-routes-mapper" },
);
