import Notice from "./components/Notice";
import Classes_day_students from "./components/classes_day_students";
import Classes_day_teacher from './components/classes_day_teacher';
import NotSubmissions from "./components/NotSubmissions";
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
                    ? (
                        <>
                            <div className="px-side py-yspace">
                                <Link
                                    className="hover:text-banner"
                                    to={`/mie/submissions`}>
                                    <h3 className="text-2xl font-bold">
                                        課題一覧へ→
                                    </h3>
                                </Link>
                                <div className="h-[0.1px] w-7/12 bg-midnight">

                                </div>
                            </div>
                            <Classes_day_teacher user_classes={mypagedata.user_classes} />
                        </>
                    )
                    : <Classes_day_students user_classes={mypagedata.user_classes} />
                }
            </>
        </div>
    )
}