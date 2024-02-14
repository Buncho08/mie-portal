import { Link } from "react-router-dom";

export default function Class({ data, index }) {
    return (
        <div
            className="col-span-1 bg-white border shadow-sm rounded-md"
        >
            <div
                className="bg-gray-100 border-b rounded-t-xl py-1 px-2 md:py-2 md:px-3"
            >
                <p key={data.time_id} className="mt-1 text-sm text-gray-500">
                    {index + 1}時間目
                </p>
            </div>
            <div className="p-4 md:p-5">
                <h3 className="text-lg font-bold text-gray-800">
                    {data.time_classes.class_name}
                </h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                    担当 {`${data.time_classes.class_teacher.user_last} ${data.time_classes.class_teacher.user_first}`} 先生
                </p>
                <Link to={`/mie/class/${data.time_classes.class_id}`} className="mt-3 inline-flex items-center gap-x-1 text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-banner disabled:opacity-50 disabled:pointer-events-none" href="#">
                    授業ページ
                    <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                </Link>
            </div>
        </div>
    )
}