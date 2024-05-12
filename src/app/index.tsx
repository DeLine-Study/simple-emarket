import { FC } from "react";
import { routeTree } from "./routeTree.gen";
import {
  RouterProvider,
  createRouter,
  createHashHistory,
} from "@tanstack/react-router";

const router = createRouter({
  routeTree,
  history: createHashHistory(),
});

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export const App: FC = () => <RouterProvider router={router} />;
