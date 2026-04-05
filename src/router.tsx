import { createBrowserRouter } from "react-router";
import { Overview } from "./views";

const HOME_ROUTE = "/";
export const ROUTES = {
  HOME: HOME_ROUTE,
  OVERVIEW: HOME_ROUTE,
  ROUTE: "/route",
};

export const router = createBrowserRouter(
  [
    {
      path: ROUTES.HOME,
      element: <Overview />,
      errorElement: <Overview />,
    },
    {
      path: `${ROUTES.ROUTE}/:savedRouteId`,

      element: <Overview />,
    },
  ],
  { basename: "/canoe-routes-mapper" },
);
