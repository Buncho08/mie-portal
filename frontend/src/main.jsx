import React from 'react'
import ReactDOM from 'react-dom/client'
import { useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import './index.css'
import ErrorPage from "./error-page";
import Signin from './signin/Signin.jsx';
import Banner from './static-components/banner.jsx'

const router = createBrowserRouter([
  // ログインページ
  {
    path: "/signin",
    element: <Signin />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
