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
import Overview from './pages/dashboard/Overview';
import DashboardLayout from "./layout/DashboardLayout";
import AllFoods from './routes/AllFoods';
import Contact from "./routes/Contact";
import About from "./routes/About";
import FAQ from "./routes/FAQ";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <Home /> },
      { path: "login", element: <Login /> },
      { path: "signup", element: <Signup /> },

      // {
      //   path: "add-foods",
      //   element: (
      //     <PrivateRoute>
      //       <AddFoodPage />
      //     </PrivateRoute>
      //   ),
      // },
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
          fetch(`https://project-web-b11-a11-food-garden-ser.vercel.app/foods/${params.id}`,{
            method: "GET",credentials: "include"
          }),

        element: (
          <PrivateRoute>
            <UpdateFood />
          </PrivateRoute>
        ),
      },

      {
        path: "/faq",
        element: (

          <FAQ />

        ),
      },

      {
        path: "/about",
        element: (

          <About/>

        ),
      },
      {
        path: "/contact",
        element: (

          <Contact />

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


  // dashboard routes


  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      { index: true, element: <Overview /> },
      { path: "all-foods", element: <AllFoods /> },
      { path: "add-food", element: <AddFoodPage /> },
      { path: "my-foods", element: <MyFoods /> },
      { path: "user-profile", element: <Profile /> },

      // {
      //   path: "update-plant/:id",
      //   loader: ({ params }) =>
      //     fetch(
      //       `https://project-web-b11-a10-plant-care-serv.vercel.app/plants/${params.id}`
      //     ),
      //   element: <UpdatePlant />,
      // },

      // {
      //   path: "plant-details/:id",
      //   element: <PlantDetailsPage />,
      // },
    ],
  },


]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
