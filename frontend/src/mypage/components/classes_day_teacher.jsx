
import { useContext } from "react";
import { UserData } from '../../root/root';

export default function Classes_day_teacher(params) {
    const user = useContext(UserData);
    const first_classes = user.user_classes[0];
    console.log(first_classes);
    const second_classes = user.user_classes[1];
    console.log(second_classes);

    // 年・月・日・曜日を取得
    const today = new Date();
    const weekday = ["日", "月", "火", "水", "木", "金", "土"];
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    let i = 1;
    let j = 1;
    return (
        <>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    {`${year}年 ${month}月 ${date}日 ${weekday[day]}曜日`}
                </h3>
            </div>
            {/* 1年生 */}
            {
                user.user_classes.map((data, index) => (
                    <>
                        {/* 1年生 */}
                        <div className="bg-slate-400 p-2">
                            <h3 className="text-base">
                                {index + 1}年生
                            </h3>
                        </div>
                        <div key={index} className="grid grid-cols-6 gap-1 p-2">
                            {
                                data.map((data, index) => (
                                    <>
                                        {data.time_classes.class_name !== 'blank' &&
                                            (<div
                                                key={data.time_id}
                                                className="col-span-1 bg-white border shadow-sm rounded-md"
                                            >
                                                <div
                                                    className="bg-gray-100 border-b rounded-t-xl py-1 px-2 md:py-4 md:px-5"
                                                >
                                                    <a key={data.time_id} className="mt-1 text-sm text-gray-500 dark:text-gray-900">
                                                        {index + 1}時間目
                                                    </a>
                                                </div>
                                                <div className="p-4 md:p-5">
                                                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">
                                                        {data.time_classes.class_name}
                                                    </h3>
                                                    <p className="mt-2 text-gray-500 dark:text-gray-400">
                                                        担当 {`${data.time_classes.class_teacher.user_last} ${data.time_classes.class_teacher.user_first}`} 先生
                                                    </p>
                                                    <a className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-banner disabled:opacity-50 disabled:pointer-events-none" href="#">
                                                        授業ページ
                                                        <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                                    </a>
                                                </div>
                                            </div>)
                                        }
                                    </>

                                ))
                            }
                        </div >
                    </>
                ))
            }


        </>
    )
}