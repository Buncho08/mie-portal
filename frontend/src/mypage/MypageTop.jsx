import Notice from "./components/notice";
import Classes_day from "./components/classes_day";
import Classes_all from "./components/classes_all";
import { UserData } from '../root/root';
import { useContext } from "react";

export async function LoadClassesData() {

}
export default function MypageTop() {
    // root.jsxで作ったcontext
    const user = useContext(UserData);

    return (
        <>
            <Notice />
            <Classes_day />
            <Classes_all />
        </>
    )
}