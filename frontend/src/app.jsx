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
import Classes from './class/class.jsx';

import { LoadUserData } from './root/root.jsx';
import { LoadLoggedStatus } from './login/Login.jsx'
import { LoadClassData } from "./class/class.jsx";

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
                },
                {
                    path: "class/:class_id",
                    element: <Classes />,
                    errorElement: <ErrorPage />,
                    loader: LoadClassData
                },
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