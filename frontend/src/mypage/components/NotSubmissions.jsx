import { Link } from "react-router-dom"
import SubTitleBar from "../../public-components/SubTitleBar"
export default function NotSubmissions({ user_notsubmissions }) {

    return (
        <>
            <SubTitleBar title={'未提出の課題'} />
            <table className="mx-side w-3/6 text-left">
                <thead className="border-b border-gray-200 ">
                    <tr>
                        <td>
                            期限
                        </td>
                        <td>
                            課題名
                        </td>
                        <td>
                            授業
                        </td>
                    </tr>
                </thead>
                <tbody className="text-left">
                    {user_notsubmissions.map((data) => (
                        <tr key={data.ast_id} className="hover:text-banner">
                            <td className="self-end font-semibold py-2">
                                <Link
                                    className="block"
                                    to={`http://localhost:3000/mie/class/${data.ast_classes.class_id}`} >
                                    {data.ast_limit}
                                </Link>
                            </td>
                            <td className="">
                                <Link
                                    className="block"
                                    to={`http://localhost:3000/mie/class/${data.ast_classes.class_id}`}>
                                    {data.ast_title}
                                </Link>
                            </td>

                            <td className="self-end">
                                <Link
                                    className="block"
                                    to={`http://localhost:3000/mie/class/${data.ast_classes.class_id}`}>
                                    {data.ast_classes.class_name}
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody >

            </table >
        </>
    )
}

