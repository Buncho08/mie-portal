import TitleBar from "../public-components/TitleBar"
import { useLoaderData } from "react-router-dom"
import { useState, useContext } from "react"
import SubmissionsList from "./components/SubmissionsList"
import SubTitleBar from "../public-components/SubTitleBar"
import { UserData } from '../root/root';
import Alert from '../public-components/Alert';

export async function LoadAllAssignmentData() {
    const allAst = await fetch(`${import.meta.env.VITE_BACKEND_URI}/assignment/all`, {
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
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ]
    const rd = Math.floor(Math.random() * 4);
    const [viewList, setViewList] = useState(allAst);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    });
    const hundleCheckTeacher = async (e) => {
        if (e.target.checked) {
            const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/assignment/all?teacher=${userdata.user_id}`,
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
                className={`
                h-32 ${bgList[rd]} bg-center flex justify-around px-side-side
                `}>
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
        </div >
    )
}