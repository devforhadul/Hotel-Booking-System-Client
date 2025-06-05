import MainLayout from "../Layouts/MainLayout";
import Home from '../Pages/Home';
import Rooms from '../Pages/Rooms';
import MyBooking from '../Pages/MyBooking';

import { createBrowserRouter } from "react-router";
import Login from "../Features/Auth/Login";
import PrivateRoute from "./PrivateRoute";
import Register from "../Features/Auth/Register";
import NotFound from "../Pages/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        element: <Home></Home>
      },
      {
        path: 'rooms',
        element: <Rooms></Rooms>
      },
      {
        path: 'my-booking',
        element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
      },
      {
        path: 'login',
        element: <Login></Login>
      },
      {
        path: 'signup',
        element: <Register></Register>
      }
    ],
  },
  {
    path: '*',
    element: <NotFound></NotFound>
  }
]);

export default router;
