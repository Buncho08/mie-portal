import TitleBar from "../public-components/TitleBar"
import { useLoaderData } from "react-router-dom"
import { useState, useContext } from "react"
import SubmissionsList from "./components/SubmissionsList"
import SubTitleBar from "../public-components/SubTitleBar"
import { UserData } from '../root/root';
import Alert from '../public-components/Alert';

export async function LoadAllAssignmentData() {
    const allAst = await fetch(`http://localhost:8000/api/assignment/all`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    return { allAst }
}


export default function AllSubmissions() {
    const userdata = useContext(UserData);
    const { allAst } = useLoaderData();
    const bef = allAst;
    const [viewList, setViewList] = useState(allAst);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    });
    const hundleCheckTeacher = async (e) => {
        if (e.target.checked) {
            const data = await fetch(`http://localhost:8000/api/assignment/all?teacher=${userdata.user_id}`,
                {
                    method: 'GET',
                    credentials: 'include'
                })
                .then((res) => res.json())
                .then((data) => data)
                .catch((err) => console.log(err));

            if (data.error) {
                setAlert({
                    'message': `${userdata.user_last}先生が担当されている課題はありません。`,
                    'disc': '',
                    'status': 1
                });
                return <></>
            }
            console.log(data);
            setViewList(data);

        }
        else {
            setViewList(bef);
        }
    }
    return (
        <div className="h-screen">
            {
                alert.message !== "" && (
                    <Alert alert={alert} setAlert={setAlert} />
                )
            }
            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around
            ">
                <TitleBar title={"課題一覧"} />
            </header>
            <div className="flex items-center px-10 py-2">
                <input
                    onChange={hundleCheckTeacher}
                    id={`check`} type="checkbox" className="w-4 h-4 text-teal-600 bg-gray-100 border-gray-300 rounded focus:ring-teal-500" />
                <label htmlFor={`check`} className="ms-2 text-sm font-medium text-gray-900">
                    担当している授業のみ表示する
                </label>
            </div>
            <SubTitleBar title={'1年生'} />
            <SubmissionsList viewList={viewList.first} hundleCheckTeacher={hundleCheckTeacher} />
            <SubTitleBar title={'2年生'} />
            <SubmissionsList viewList={viewList.second} hundleCheckTeacher={hundleCheckTeacher} />
        </div>
    )
}