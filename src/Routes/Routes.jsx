import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../pages/Home/Home/Home";
import Login from "../pages/Login/Login";
import Signup from "../pages/SignUp/Signup";

import BookService from "../pages/BookService/BookService";
import Bookings from "../pages/Bookings/Bookings";
import PrivateRoutes from "./PrivateRoutes";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />,
    //   errorElement: <ErrorPage />,
      children: [
        {
          path: "/",
          element: <Home />,
        },
        {
          path:"/login",
          element:<Login></Login>
        },
        {
          path:"/signUp",
          element:<Signup></Signup>
        },
        {
          path:"/book/:id",
          element:<PrivateRoutes><BookService></BookService></PrivateRoutes>,
          loader: ({params})=> fetch(`https://car-doctor-server-green.vercel.app/${params.id}`)
        },
        {
          path:"/bookings",
          element:<PrivateRoutes><Bookings></Bookings></PrivateRoutes>
        }
      ],
    },
  ]);
  export default router;