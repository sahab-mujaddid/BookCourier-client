import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { getAuth } from "firebase/auth";
import app from "./firebase/firebase.config.js"; // 🔹 import app first
const auth = getAuth(app);

import AuthProvider from "./Provider/AuthProvider.jsx";
import AuthLayout from "./AuthLayout/AuthLayout.jsx";
import PrivateRoute from "./Provider/PrivateRoute.jsx";
import App from "./App.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // 🔹 fixed import
import Root from "./Root/Root.jsx";
import Home from "./Home/Home.jsx";
import Books from "./Books/Books.jsx";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Bookdetails from "./Bookdetails/Bookdetails.jsx";
import BuyForm from "./BuyForm/BuyForm.jsx";
import ContactPage from "./ContactPage/ContactPage.jsx";
import DashboardLayout from "./AuthLayout/DashboardLayout.jsx";
import MyOrder from "./Myorder/Myorder.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // 🔹 import styles
import MyProfile from "./myProfile/MyProfile.jsx";
import Invoice from "./Invoice/Invoice.jsx";
import AllUsers from "./allUsers/AllUsers.jsx";
import AddBooks from "./addBooks/AddBooks.jsx";
import MyBooks from "./myBooks/myBooks.jsx";
import ManageBooks from "./manageBooks/ManageBooks.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        loader: () => fetch("http://localhost:3000/models"),
        element: <Home />,
      },
      {
        path: "/Books",
        loader: () => fetch("http://localhost:3000/models"),
        element: (
          <PrivateRoute>
            <Books />
          </PrivateRoute>
        ),
      },
      {
        path: "/ContactPage",
        element: <ContactPage />,
      },
      {
        path: "/Bookdetails/:_id",
        loader: () => fetch("http://localhost:3000/models"),
        element: <Bookdetails />,
      },
      {
        path: "/BuyForm",
        element: <BuyForm />,
      },
      {
        path: "/auth",
        element: <AuthLayout />,
        children: [
          {
            path: "/auth/Login",
            element: <Login />,
          },
          {
            path: "/auth/Registration",
            element: <Registration />,
          },
        ],
      },
    ],
  },
  {
    path: "dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "myorder",
        element: <MyOrder />, 
      },
      {
        path: "myprofile",
        element: <MyProfile/>,
      },
      {
        path: "invoice",
        element: <Invoice />, // You can create a separate Invoice component if needed
      },
      {
        path:"allusers",
         loader: () => fetch("http://localhost:3000/users"),
        element:<AllUsers />,
      },
      {
        path: "addbook",
        loader: () => fetch("http://localhost:3000/librarianbooks"),
        element: <AddBooks />,
      },
      {
        path: "mybooks",
        element: <MyBooks />, // You can create a separate MyBooks component if needed
      },
      {
        path:"managebooks",
        element:<ManageBooks />, // You can create a separate ManageBooks component if needed
      }
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer /> {/* 🔹 moved inside StrictMode */}
    </AuthProvider>
  </StrictMode>
);
