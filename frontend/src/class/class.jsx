import { useLoaderData } from "react-router-dom";
import { UserData } from '../root/root';
import { useContext, useEffect, useState } from "react";
import Notice from './components/notice';
import Assignment_teacher from "./components/assignment_teacher";
import Assignment_students from "./components/assignment_students";
import { formatDate } from '../public-components/utils/utils';
import SuccessAlert from "../public-components/Alert";
import Confirmation from "../public-components/Confirmation"
import TitleBar from '../public-components/TitleBar'
export async function LoadClassData({ params }) {

    const classdata = await fetch(`http://localhost:8000/api/classes/${params.class_id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())

        .then((data) => data)
        .catch((err) => console.log(err))

    return { classdata };
}

export default function Classes() {
    const { classdata } = useLoaderData();
    const userdata = useContext(UserData);

    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': '',
    });

    return (
        <div className={`h-screen w-full`}>
            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around px-side-side
            ">
                <TitleBar title={classdata.class_name} />

                <div className="self-end flex gap-3 items-center m-4 w-96 text-xl">
                    <img src={`http://localhost:8000/api${classdata.class_teacher.user_icon}`} alt="" width={50} height={50} />
                    <p className="self-center">
                        {classdata.class_teacher.user_last} {classdata.class_teacher.user_first} <small>先生</small>
                    </p>
                </div>
            </header>

            <main className="px-side-side">
                <Notice class_id={classdata.class_id} notice_main={classdata.notice_classes[0].notice_main} setAlert={setAlert} />
                {userdata.user_grade === 2
                    ? (<Assignment_teacher class_id={classdata.class_id} setAlert={setAlert} />)
                    : <Assignment_students class_id={classdata.class_id} setAlert={setAlert} />
                }
            </main>
            {
                alert.message !== '' && (
                    <SuccessAlert alert={alert} setAlert={setAlert} />
                )
            }

        </div>
    )
}