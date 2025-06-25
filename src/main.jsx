import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Pages and components
import App from "./App";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import UpdateFood from "./pages/UpdateFood";

// Context & Routes
import AuthProvider from "./context/Provider/AuthProvider";
import PrivateRoute from "./routes/PrivateRoute";

// Feature pages
import MyFoods from "./routes/MyFoods";
import AddFoodPage from "./routes/AddFoodPage";
import FoodDetailsPage from "./routes/FoodDetailsPage";
import Profile from "./routes/Profile";
import FridgePage from "./routes/FridgePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      {
        path: "add-foods",
        element: (
          <PrivateRoute>
            <AddFoodPage />
          </PrivateRoute>
        ),
      },
      {
        path: "/fridge",
        element: (
          <PrivateRoute>
            <FridgePage />
          </PrivateRoute>
        ),
      },
      {
        path: "update-food/:id",
        loader: ({ params }) =>
          fetch(`https://project-web-b11-a11-food-garden-ser.vercel.app/foods/${params.id}`),

        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },
      {
        path: "/profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      
      {
        path: "my-foods",
        element: (
          <PrivateRoute>
            <MyFoods />
          </PrivateRoute>
        ),
      },
      {
        path: "food-details/:id",
        element: (
          <PrivateRoute>
            <FoodDetailsPage />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
