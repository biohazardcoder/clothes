import React, { useEffect } from "react";
import { Home } from "./pages/Home/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootLayout } from "./layout/RootLayout";
import { Login } from "./pages/auth/Login/Login";
import { getUserError, getUserPending, getUserSuccess } from "./toolkit/UserSlicer";
import { useDispatch } from "react-redux";
import Axios from "./Axios";
import Dashboard from "./pages/Dashboard/Dashboard";
import Wishlist from "./pages/Wishlist/Wishlist";
import { Register } from "./pages/auth/Register/Register";
import Detail from "./pages/Detail/Detail";
import { Error } from "./pages/Error/Error";
import { AboutUs } from "./pages/About/About";
import { Shop } from "./pages/Shop/Shop";


function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    async function getMyData() {
      try {
        dispatch(getUserPending());

        const response = await Axios.get("client/me");

        if (response?.data) {
          dispatch(getUserSuccess(response.data.data));
        } else {
          dispatch(getUserError("No user data available"));
        }
      } catch (error) {
        const errorMessage = error?.response?.data || "Unknown error occurred";
        dispatch(getUserError(errorMessage));
      }
    }

    getMyData();
  }, [dispatch]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <RootLayout />,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Dashboard />,
        },
        {
          path: "/wishlist",
          element: <Wishlist />,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/shop",
          element: <Shop />,
        },
        {
          path: "/register",
          element: <Register />,
        },
        {
          path: "/detail/:id",
          element: <Detail />
        },
        {
          path: "/about",
          element: <AboutUs />
        },
        {
          path: "*",
          element: <Error />
        }
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
