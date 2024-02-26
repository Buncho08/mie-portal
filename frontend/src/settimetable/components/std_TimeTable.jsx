import { Link } from "react-router-dom";

export default function StdTimeTable({ timetable, classes, hundleUpdateTable, time_grade }) {
    const daydate = ['月', '火', '水', '木', '金'];

    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
            <table className="bg-gray-50">
                <thead className="bg-gray-100">
                    <tr className="hover:bg-gray-50">
                        <th className="w-[100px]">

                        </th>
                        {daydate.map((data, index) => (
                            <th scope="col" className="px-4 py-2 font-medium text-gray-900" key={index * 13}>
                                {data}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-t border-gray-100">
                    {
                        timetable.map((day, ddx) => {
                            return (
                                <tr key={ddx}>
                                    <th className="font-medium text-gray-900">
                                        {ddx + 1} 時間
                                    </th>
                                    {day.map((time, tdx) => (
                                        <td className="px-4 py-2" key={tdx * 23}>
                                            <p className="w-[10.2rem] outline-0">
                                                <Link
                                                    className="hover:text-banner block w-full"
                                                    to={time.time_classes_id ? `http://localhost:3000/mie/class/${time.time_classes_id.class_id}` : ('')}>
                                                    {time.time_classes_id ? time.time_classes_id.class_name : '-'}
                                                </Link>
                                            </p>
                                        </td>
                                    ))}
                                </tr>
                            )
                        })
                    }

                </tbody>
            </table>
        </div>
        // <table className="border border-black border-separate">

        // </table>
    )
}