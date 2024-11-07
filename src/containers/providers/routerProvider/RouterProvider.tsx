import { Suspense } from "react";
import {
  createBrowserRouter,
  RouterProvider as Provider,
} from "react-router-dom";
import { ROUTES } from "@/enums";
import App from "@/App";
import HomePage from "@/pages/HomePage/HomePage";
import SuperheroDetailsPage from "@/pages/SuperheroDetailsPage/SuperheroDetailsPage";
import { Loader } from "@/components";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    children: [
      {
        path: ROUTES.HOME,
        element: (
          <Suspense fallback={<Loader />}>
            <HomePage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.SUPERHERO_DETAILS,
        element: (
          <Suspense fallback={<Loader />}>
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
