import { createRoot } from "react-dom/client";
import "./index.css";
// import App from "./pages/HomePage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import RootLayout from "@pages/RootLayout";
// import HomePage from "@pages/HomePage";
// import MovieDetail from "@pages/MovieDetail";
// import TVShowDetail from "@pages/TVShowDetail";
import ModalProvider from "@context/ModalProvider";
// import PeoplePage from "@pages/PeoplePage";
import { lazy } from "react";

const MovieDetail = lazy(() => import("@pages/MovieDetail"));
const TVShowDetail = lazy(() => import("@pages/TVShowDetail"));
const HomePage = lazy(() => import("@pages/HomePage"));
const PeoplePage = lazy(() => import("@pages/PeoplePage"));

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/movie/:id",
        element: <MovieDetail />,
      },
      {
        path: "/tv/:id",
        element: <TVShowDetail />,
      },
      {
        path: "/people/:id",
        element: <PeoplePage />,
        loader: async ({ params }) => {
          const res = await fetch(
            `https://api.themoviedb.org/3/person/${params.id}?append_to_response=combined_credits`,
            {
              headers: {
                accept: "application/json",
                Authorization: `Bearer ${import.meta.env.VITE_API_TOKEN}`,
              },
            },
          );
          return res;
        },
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <ModalProvider>
    <RouterProvider router={router} />
  </ModalProvider>,
  // {/* <App /> */}
  // </StrictMode>,
);
