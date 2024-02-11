
import Newdata from "./components/newdata";

import Notice from "./components/notice";
import Classes_day_students from "./components/classes_day_students";
import Classes_day_teacher from './components/classes_day_teacher';

import { UserData } from '../root/root';
import { useContext } from "react";


export default function MypageTop() {
    // root.jsxで作ったcontext
    const userdata = useContext(UserData);
    return (
        <>
            <div className="w-full h-14 bg-blue p-2 flex items-center">
                <h2 className="text-2xl">
                    マイページ
                </h2>
            </div>
            <Notice />
            <>
                {userdata.user_grade === 2
                    ? <Classes_day_teacher />
                    : <Classes_day_students />
                }
            </>
            <Newdata />
        </>
    )
}