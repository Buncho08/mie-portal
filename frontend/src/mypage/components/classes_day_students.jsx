
import { useContext, Fragment } from "react";
import { UserData } from '../../root/root';
import { Link } from "react-router-dom";
import SubTitleBar from "../../public-components/SubTitleBar";
import Class from "./Class";

export default function Classes_day_students({ user_classes }) {
    const today = new Date();
    // 年・月・日・曜日を取得
    const weekday = ["日", "月", "火", "水", "木", "金", "土"];
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    let i = 1;
    return (
        <div className="w-full">
            <SubTitleBar title={`${year}年 ${month}月 ${date}日 ${weekday[day]}曜日 の授業`} />

            <div className="grid grid-cols-6 pl-1 gap-1">
                {
                    user_classes.map((data, index) => (
                        <Class data={data} key={data.time_id} index={index} />
                    ))
                }
            </div >
        </div>
    )
}