
import { useContext } from "react";
import { UserData } from '../../root/root';

export default function Classes_day(params) {
    const user = useContext(UserData);
    const user_classes = user.user_classes;
    const today = new Date();
    // 年・月・日・曜日を取得
    const weekday = ["日", "月", "火", "水", "木", "金", "土"];
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const date = today.getDate();
    const day = today.getDay();
    let i = 1;
    return (
        <>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    {`${year}年 ${month}月 ${date}日 ${weekday[day]}曜日`}
                </h3>
            </div>
            <section className="grid grid-cols-6 gap-1 p-2">
                {
                    user_classes.map((data) => (
                        <>
                            {data.time_classes.class_name == 'blank'
                                ? (<></>)
                                : (<div
                                    key={data.time_id}
                                    class="col-span-1 bg-white border shadow-sm rounded-md dark:bg-slate-900 "
                                >
                                    <div
                                        class="bg-gray-100 border-b rounded-t-xl py-1 px-2 md:py-3 md:px-4"
                                    >
                                        <a class="mt-1 text-sm text-gray-500">
                                            {i++}時間目
                                        </a>
                                    </div>
                                    <div class="p-4 md:p-5">
                                        <h3 class="text-lg font-bold text-gray-800">
                                            {data.time_classes.class_name}
                                        </h3>
                                        <p class="mt-2 text-gray-500">
                                            担当 {`${data.time_classes.class_teacher.user_last} ${data.time_classes.class_teacher.user_first}`} 先生
                                        </p>
                                        <a class="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-banner disabled:opacity-50 disabled:pointer-events-none" href="#">
                                            授業ページ
                                            <svg class="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                                        </a>
                                    </div>
                                </div>)
                            }
                        </>

                    ))
                }
            </section >
        </>
    )
}