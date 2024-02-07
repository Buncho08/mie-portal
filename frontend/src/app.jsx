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
import TeamTop from "./teamtop/TeamTop.jsx";
import TeamPage from "./teampage/TeamPage.jsx";

import { LoadUserData } from './root/root.jsx';
import { LoadLoggedStatus } from './login/Login.jsx'
import { LoadClassData } from "./class/class.jsx";
import { LoadTeamData } from "./teamtop/TeamTop.jsx";
import { LoadTeamPageData } from "./teampage/TeamPage.jsx";
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
                {
                    path: 'team',
                    element: <TeamTop />,
                    errorElement: <ErrorPage />,
                    loader: LoadTeamData
                },
                {
                    path: 'team/:team_id',
                    element: <TeamPage />,
                    errorElement: <ErrorPage />,
                    loader: LoadTeamPageData
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