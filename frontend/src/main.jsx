import React from 'react'
import ReactDOM from 'react-dom/client'
import Cookies from 'js-cookie';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import ErrorPage from "./error-page";
import Signin from './signin/Signin.jsx';

import Login from './login/Login.jsx';

import Root from './root/root.jsx';

import { LoadUserData } from './root/root.jsx';

// async function loadUserData() {
//   let user = {};
//   await fetch('http://localhost:8000/api/myaccount', {
//     method: 'GET',
//     credentials: "include",
//   })
//     .then((res) => {
//       // console.log(res);
//       return res.json();
//     })
//     .then((data) => {
//       // console.log(data);
//       user = data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });

//   return { user };
// }

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    id: 'root',
    errorElement: <ErrorPage />,
    loader: LoadUserData,
  },
  // 登録ページ
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
