import { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider as Provider,
} from "react-router-dom";
import { ROUTES } from "@/enums";
import App from "@/App";
import HomePage from "@/pages/HomePage/HomePage";
import SuperheroDetailsPage from "@/pages/SuperheroDetailsPage/SuperheroDetailsPage";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SUPERHERO_DETAILS,
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <SuperheroDetailsPage />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function RouterProvider() {
  return <Provider router={router} />;
}
