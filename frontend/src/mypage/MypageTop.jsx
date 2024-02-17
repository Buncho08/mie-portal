import Notice from "./components/notice";
import Classes_day_students from "./components/classes_day_students";
import Classes_day_teacher from './components/classes_day_teacher';
import NotSubmissions from "./components/NotSubmissions";
import MyClasses from "./components/MyClasses";
import TitleBar from "../public-components/TitleBar";

import { UserData } from '../root/root';
import { useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";

export async function LoadMypageData() {
    const mypagedata = await fetch('http://localhost:8000/api/mypage', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { mypagedata }
}

export default function MypageTop() {
    // root.jsxで作ったcontext
    const userdata = useContext(UserData);
    const { mypagedata } = useLoaderData()
    return (
        <div className="h-screen">
            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around
            ">
                <TitleBar title={'マイページ'} />

            </header>
            <>
                {
                    userdata.user_grade !== 2 && <NotSubmissions user_notsubmissions={mypagedata.user_notsubmissions} />
                }
            </>

            <Notice user_notice={mypagedata.user_notice} />
            <>
                {userdata.user_grade === 2
                    ? <Classes_day_teacher user_classes={mypagedata.user_classes} />
                    : <Classes_day_students user_classes={mypagedata.user_classes} />
                }
            </>
            <>
                {
                    userdata.user_grade === 2 && (
                        <>
                            <Link to={'/mie/timetable'}>
                                → 時間割の編集
                            </Link>
                            <br />
                            <Link to={'/mie/classes'}>
                                →授業一覧
                            </Link>
                            <MyClasses />

                        </>

                    )
                }
            </>
        </div>
    )
}