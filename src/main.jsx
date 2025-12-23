import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { getAuth } from 'firebase/auth'
const auth = getAuth(app);
import AuthProvider from './Provider/AuthProvider.jsx';
import AuthLayout from './AuthLayout/AuthLayout.jsx';
import PrivateRoute from './Provider/PrivateRoute.jsx';
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Root from './Root/Root.jsx';
import Home from './Home/Home.jsx';
import { Link } from 'react-router';
import Books from './Books/Books.jsx';
import Deshboard from './Deshboard/Deshboard.jsx';
import app from './firebase/firebase.config.js';
import Login from './pages/Login.jsx';
import Registration from './pages/Registration.jsx';
import Bookdetails from './Bookdetails/Bookdetails.jsx';
import Myorder from './Myorder/Myorder.jsx';
import BuyForm from './BuyForm/BuyForm.jsx';
import ContactPage from './ContactPage/ContactPage.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children:[
      {
        path:'/',
        loader:() =>fetch ('https://book-courier-two.vercel.app/models'),
        element:<PrivateRoute><Home></Home></PrivateRoute>
      },
      {
        path:'/Books',
         loader:() =>fetch ('https://book-courier-two.vercel.app/models'),
        element:<PrivateRoute><Books></Books></PrivateRoute>
      },
      
    {
      path:'/Deshboard',
      element:<Deshboard></Deshboard>,
    },
    {
      path:'/ContactPage',
      element:<ContactPage></ContactPage>,
    },
    {
      path:'/Myorder',
      element:<Myorder></Myorder>
    },
    {
      path:'/Bookdetails/:_id',
    loader:() =>fetch ('https://book-courier-two.vercel.app/models'),
      element:<Bookdetails></Bookdetails>,
    },
    {
      path:'/Myorder',
      element:<Myorder></Myorder>,
    },
    {
      path:'/BuyForm',
      element:<BuyForm></BuyForm>,
    },
    {
      path:'Deshboard',
      element:<Deshboard></Deshboard>,
    },
      {
       path:'/auth',
       element:<AuthLayout></AuthLayout>,

       children:[
        {
         path:'/auth/Login',
         element:<Login></Login>

        },
        
        {
          path:'/auth/Registration',
          element:<Registration></Registration>
        }
       ]
  

      },
    ]
  },

  
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
       <RouterProvider router={router} />,
    </AuthProvider>
   
  </StrictMode>,
)
