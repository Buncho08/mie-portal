import { Link } from "react-router-dom"

export default function SubmissionsList({ viewList }) {
    return (
        <div className="w-[70%] ml-side pb-10">
            <>
                {
                    viewList.length !== 0
                        ? (
                            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
                                <table className="bg-gray-50 w-full">
                                    <thead className="bg-gray-100 w-full">
                                        <tr className="hover:bg-gray-50">
                                            <td className="font-medium pl-10">
                                                課題名
                                            </td>
                                            <td className="font-medium text-center">
                                                授業名
                                            </td>
                                            <td className="font-medium text-center">
                                                担当教師
                                            </td>
                                            <td className="font-medium text-center">
                                                提出期限
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 border-t border-gray-100">
                                        {viewList.map((data) => (
                                            <tr key={data.ast_id}>
                                                <td className="font-medium  text-gray-900 pl-10">
                                                    <Link className="block hover:text-banner" to={`/mie/assignments/${data.ast_classes.class_id}/${data.ast_id}`}>
                                                        {data.ast_title}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    <Link className="block hover:text-banner" to={`/mie/class/${data.ast_classes.class_id}`}>
                                                        {data.ast_classes.class_name}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    {data.ast_classes.class_teacher}
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    {data.ast_limit}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )
                        :
                        (
                            <div className="overflow-hidden rounded-lg border border-gray-200 shadow-md">
                                <table className="bg-gray-50 w-full">
                                    <thead className="bg-gray-100 w-full">
                                        <tr className="hover:bg-gray-50">
                                            <td className="font-medium pl-10">
                                                課題名
                                            </td>
                                            <td className="font-medium text-center">
                                                授業名
                                            </td>
                                            <td className="font-medium text-center">
                                                担当教師
                                            </td>
                                            <td className="font-medium text-center">
                                                提出期限
                                            </td>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200 border-t border-gray-100">
                                        <tr className="hover:bg-gray-50">
                                            <td className="font-medium pl-10">
                                                現在課題は出ておりません。
                                            </td>
                                            <td className="font-medium text-center">
                                            </td>
                                            <td className="font-medium text-center">

                                            </td>
                                            <td className="font-medium text-center">

                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        )
                }

            </>
        </div>
    )
}