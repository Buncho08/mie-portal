import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

import './index.css'
import ErrorPage from "./public-components/error-page.jsx";
import Signin from './signin/Signin.jsx';

import Login from './login/Login.jsx';
import MypageTop from './mypage/MypageTop.jsx';
import Root from './root/root.jsx';
import Students from './students/stdudents.jsx';
import Classes from './class/class.jsx';
import TeamTop from "./teamtop/TeamTop.jsx";
import TeamPage from "./teampage/TeamPage.jsx";
import Profile from "./profile/profile.jsx";
import Settings from "./settings/settings.jsx";
import SetTimeTable from "./settimetable/SetTimeTable.jsx";
import Assignments from "./class/components/Assignments.jsx";
import ClassesAll from "./classes/ClassesAll.jsx";
import Resize from "./Resize/Resize.jsx";

import { LoadUserData } from './root/root.jsx';
import { LoadLoggedStatus } from './login/Login.jsx'
import { LoadClassData } from "./class/class.jsx";
import { LoadTeamData } from "./teamtop/TeamTop.jsx";
import { LoadTeamPageData } from "./teampage/TeamPage.jsx";
import { LoadUsersData } from "./profile/profile.jsx";
import { LoadUserSettingData } from "./settings/settings.jsx";
import { LoadMypageData } from "./mypage/MypageTop.jsx";
import { LoadTimeTableData } from "./settimetable/SetTimeTable.jsx";
import { LoadAssignmentsData } from "./class/components/Assignments.jsx";
import { LoadClassesData } from "./classes/ClassesAll.jsx";


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
                    errorElement: <ErrorPage />,
                    loader: LoadMypageData
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
                {
                    path: 'profile',
                    element: <Profile />,
                    errorElement: <ErrorPage />,
                    loader: LoadUsersData
                },
                {
                    path: 'settings',
                    element: <Settings />,
                    errorElement: <ErrorPage />,
                    loader: LoadUserSettingData,
                },
                {
                    path: 'timetable',
                    element: <SetTimeTable />,
                    errorElement: <ErrorPage />,
                    loader: LoadTimeTableData

                },
                {
                    path: 'assignments/:class_id/:ast_id',
                    element: <Assignments />,
                    errorElement: <ErrorPage />,
                    loader: LoadAssignmentsData
                },
                {
                    path: 'classes',
                    element: <ClassesAll />,
                    errorElement: <ErrorPage />,
                    loader: LoadClassesData
                },
                {
                    path: 'resize',
                    element: <Resize />,
                    errorElement: <ErrorPage />,
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