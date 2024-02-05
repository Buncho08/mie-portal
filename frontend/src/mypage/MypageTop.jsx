import Notice from "./components/notice";
import Classes_day from "./components/classes_day";
import Classes_day_teacher from './components/classes_day_teacher';
import Newdata from "./components/newdata";
import { UserData } from '../root/root';
import { useContext } from "react";

export async function LoadClassesData() {

}
export default function MypageTop() {
    // root.jsxで作ったcontext
    const userdata = useContext(UserData);
    return (
        <>
            <Notice />
            <>
                {userdata.user_grade === 2
                    ? <Classes_day_teacher key={userdata.user_id} />
                    : <Classes_day key={0} />
                }
            </>
            <Newdata />
        </>
    )
}