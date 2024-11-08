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
import ErrorPage from "@/pages/ErrorPage/ErrorPage";
import NotFoundPage from "@/pages/NotFoundPage/NotFoundPage";
import { NotFoundRedirect } from "@/pages/NotFoundPage/NotFoundRedirect";

const router = createBrowserRouter([
  {
    path: ROUTES.HOME,
    element: (
      <Suspense fallback={<Loader />}>
        <App />
      </Suspense>
    ),
    errorElement: (
      <Suspense fallback={<Loader />}>
        <ErrorPage />
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
      {
        path: ROUTES.NOT_FOUND,
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundPage />
          </Suspense>
        ),
      },
      {
        path: ROUTES.UNEXPECTED,
        element: (
          <Suspense fallback={<Loader />}>
            <NotFoundRedirect />
          </Suspense>
        ),
      },
    ],
  },
]);

export default function RouterProvider() {
  return <Provider router={router} />;
}
