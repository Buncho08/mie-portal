import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './index.css'
import ErrorPage from "./error-page";
import Signin from './signin/Signin.jsx';

import Login from './login/Login.jsx';
import MypageTop from './mypage/MypageTop.jsx';
import Root from './root/root.jsx';
import Students from './students/stdudents.jsx';
import { LoadUserData } from './root/root.jsx';
import { LoadLoggedStatus } from './login/Login.jsx'




export default function App() {
    const router = createBrowserRouter([
        {
            path: "/mie",
            element: <Root />,
            id: 'root',
            errorElement: <ErrorPage />,
            loader: LoadUserData,
            children: [
                {
                    path: 'mypage',
                    element: <MypageTop />,
                    errorElement: <ErrorPage />
                },
                {
                    path: 'students',
                    element: <Students />,
                    errorElement: <ErrorPage />

                }
            ]
        },
        // 登録ページ
        {
            path: "/signin",
            element: <Signin />,
            errorElement: <ErrorPage />,
            loader: LoadLoggedStatus,
        },
        {
            path: "/login",
            element: <Login />,
            errorElement: <ErrorPage />,
            loader: LoadLoggedStatus,
        },
    ]);

    return (
        <RouterProvider router={router} />
    )
}