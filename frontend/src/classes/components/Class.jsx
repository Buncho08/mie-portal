import { Link } from "react-router-dom"

export default function Class({ classdata, setTarget, setViewModal }) {
    return (
        <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
            <table className="bg-gray-50 w-full">
                <thead className="bg-gray-100 w-full">
                    <tr className="hover:bg-gray-50">
                        <td className="font-medium pl-10">
                            授業名
                        </td>
                        <td className="text-center">
                            教師
                        </td>
                        <td>

                        </td>
                        <td>

                        </td>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-t border-gray-100">

                    {classdata.map((data) => (
                        <tr key={data.class_id}>
                            <td className="font-medium  text-gray-900 pl-10">
                                <Link className="block hover:text-banner" to={`http://localhost:3000/mie/class/${data.class_id}`}>
                                    {data.class_name}
                                </Link>
                            </td>
                            <td className="px-4 py-2 text-center">
                                {data.class_teacher.user_last}先生
                            </td>
                            <td>
                                <button
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setViewModal(1);
                                        setTarget({
                                            'target': data.class_name,
                                            'target_data': data,
                                        })
                                    }}
                                >
                                    🖋
                                </button>
                            </td>
                            <td>
                                <button onClick={(e) => {
                                    e.preventDefault();
                                    setViewModal(2);
                                    setTarget({
                                        'target': data.class_name,
                                        'target_data': data,
                                    });
                                }}>
                                    🗑️
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
