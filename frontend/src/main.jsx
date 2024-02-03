import React from 'react'
import { useContext } from 'react';
import ReactDOM from 'react-dom/client'
// import {
//   createBrowserRouter,
//   RouterProvider,
// } from "react-router-dom";

import './index.css'
import App from './app';
// import ErrorPage from "./error-page";
// import Signin from './signin/Signin.jsx';

// import Login from './login/Login.jsx';
// import MypageTop from './mypage/MypageTop.jsx';
// import Root from './root/root.jsx';

// import { LoadUserData } from './root/root.jsx';
// import { LoadLoggedStatus } from './login/Login.jsx'



// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Root />,
//     id: 'root',
//     errorElement: <ErrorPage />,
//     loader: LoadUserData,
//     children: [
//       {
//         path: '/Mypage',
//         element: <MypageTop />,
//       },
//     ]
//   },

//   // 登録ページ
//   {
//     path: "/signin",
//     element: <Signin />,
//     errorElement: <ErrorPage />,
//     loader: LoadLoggedStatus,
//   },
//   {
//     path: "/login",
//     element: <Login />,
//     errorElement: <ErrorPage />,
//     loader: LoadLoggedStatus,
//   },
// ]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
