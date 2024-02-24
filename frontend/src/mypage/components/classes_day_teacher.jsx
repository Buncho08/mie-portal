
import { useContext, Fragment } from "react";
import { UserData } from '../../root/root';

import SubTitleBar from "../../public-components/SubTitleBar";
import SectionTitleBar from "../../public-components/SectionTitleBar";
import Class from "./Class";

export default function Classes_day_teacher({ user_classes }) {
    const user = useContext(UserData);
    // 年・月・日・曜日を取得
    const today = new Date();
    const weekday = ["日", "月", "火", "水", "木", "金", "土"];
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();

    return (
        <Fragment key={user.user_id}>
            <SubTitleBar title={`${year}年 ${month}月 ${date}日 ${weekday[day]}曜日 の授業`} />
            {
                user_classes.map((data, index) => (
                    // ユニークなキーがなかったorz
                    <details key={index * 100} open className="pb-10">
                        <summary className="my-3 mx-side-side">
                            {`${index + 1}年生の授業`}
                        </summary>
                        <div className="grid grid-cols-6 gap-1 mx-side">
                            {
                                data.map((data, index) => (
                                    <Class data={data} key={data.time_id} index={index} />
                                ))
                            }
                        </div >
                    </details>
                ))
            }
        </Fragment>
    )
}