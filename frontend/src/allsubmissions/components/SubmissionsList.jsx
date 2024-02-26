import { Link } from "react-router-dom"
import { useState, useContext } from "react";
import { UserData } from '../../root/root';
import Alert from '../../public-components/Alert';

export default function SubmissionsList({ ast_data }) {
    const userdata = useContext(UserData);
    const bef = ast_data;
    const [viewList, setViewList] = useState(bef);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    });

    const hundleCheckTeacher = async (e) => {
        e.preventDefault();
        if (e.target.checked) {
            const data = await fetch(`http://localhost:8000/api/assignment/all?teacher=${userdata.user_id}&grade=${ast_data[0].ast_classes.class_grade}`)
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));
            if (data.error) {
                setAlert({
                    'message': data.error,
                    'disc': '',
                    'status': 1
                });
                return <></>
            }

            if (ast_data[0].ast_classes.class_grade === 0) {
                setViewList(data.first);
            }
            else {
                setViewList(data.second);
            }

        }
        else {
            setViewList(bef);
        }
    }
    return (
        <div className="w-[70%] ml-side pb-10">
            <>
                <div className="flex items-center me-4 mb-4">
                    <input
                        onChange={hundleCheckTeacher}
                        id={`teal-checkbox${ast_data[0].ast_classes.class_grade}`} type="checkbox" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500" />
                    <label htmlFor={`teal-checkbox${ast_data[0].ast_classes.class_grade}`} className="ms-2 text-sm font-medium text-gray-900">
                        担当授業のみ表示する
                    </label>
                </div>
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
                                        <Link className="block hover:text-banner" to={`http://localhost:3000/mie/assignments/${data.ast_classes.class_id}/${data.ast_id}`}>
                                            {data.ast_title}
                                        </Link>
                                    </td>
                                    <td className="px-4 py-2 text-center">
                                        <Link className="block hover:text-banner" to={`http://localhost:3000/mie/class/${data.ast_classes.class_id}`}>
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
            </>
            {/* {
                viewList.length < 0
                    ? (
                        <p>
                            現在、課題は出ていません
                        </p>
                    )
                    :
                    (
                        <>
                            <div className="flex items-center me-4 mb-4">
                                <input
                                    onChange={hundleCheckTeacher}
                                    id={`teal-checkbox${ast_data[0].ast_classes.class_grade}`} type="checkbox" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500" />
                                <label htmlFor={`teal-checkbox${ast_data[0].ast_classes.class_grade}`} className="ms-2 text-sm font-medium text-gray-900">
                                    担当授業のみ表示する
                                </label>
                            </div>
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
                                                    <Link className="block hover:text-banner" to={`http://localhost:3000/mie/assignments/${data.ast_classes.class_id}/${data.ast_id}`}>
                                                        {data.ast_title}
                                                    </Link>
                                                </td>
                                                <td className="px-4 py-2 text-center">
                                                    <Link className="block hover:text-banner" to={`http://localhost:3000/mie/class/${data.ast_classes.class_id}`}>
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
                        </>
                    )
            } */}

        </div>
    )
}