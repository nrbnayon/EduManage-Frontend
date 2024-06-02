import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import NotFound from "../NotFound/NotFound";
import Home from "../Pages/Home/Home";

import GuestRoute from "./GuestRoute";
import Login from "../Pages/Authentication/Login";
import Register from "./../Pages/Authentication/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <NotFound />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "/register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
    ],
  },
  // {
  //   path: "/dashboard",
  //   element: (
  //     <ProtectedRoute>
  //       <Dashboard />
  //     </ProtectedRoute>
  //   ),
  //   children: [
  //     // normal user Route
  //     {
  //       path: "cart",
  //       element: (
  //         <ProtectedRoute>
  //           <Cart />
  //         </ProtectedRoute>
  //       ),
  //     },

  //     //admin Routes
  //     {
  //       path: "addItems",
  //       element: (
  //         <AdminRoute>
  //           <AddItem />
  //         </AdminRoute>
  //       ),
  //     },

  //     {
  //       path: "users",
  //       element: (
  //         <AdminRoute>
  //           <AllUsers />
  //         </AdminRoute>
  //       ),
  //     },
  //   ],
  // },
]);
