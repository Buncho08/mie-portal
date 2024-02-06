import { redirect, useLoaderData } from "react-router-dom";
import { UserData } from '../root/root';
import { useContext, useEffect, useState } from "react";
import { fetchAssignment } from "./utils/assignment";
import Notice from './components/notice';
import Assignment_teacher from "./components/assignment_teacher";
import Assignment_students from "./components/assignment_students";
import { formatDate } from '../utils/utils';

export async function LoadClassData({ params }) {

    const classdata = await fetch(`http://localhost:8000/api/classes/${params.class_id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => {
            if (res.status >= 400) {
                return res.status;
            }
            return res.json();
        })

        .then((data) => {
            return data;
        });


    if (classdata === 401) {
        return redirect('/login');
    }
    if (classdata == 400) {
        return redirect('/mie/mypage');
    }
    return { classdata };
}

export default function Classes() {
    const { classdata } = useLoaderData();
    const userdata = useContext(UserData);
    const [assignmentData, setAssignment] = useState([])

    useEffect(() => {
        let ignore = false;
        fetchAssignment(classdata.class_id).then(res => {
            if (!ignore) {
                setAssignment(res)
            }
        })

        return () => {
            ignore = true
        }
    }, [])

    return (
        <>
            <header
                className="
            h-40 bg-[url('/class_bg.jpg')] bg-center flex justify-between
            ">
                <h1 className="text-3xl self-end m-4">
                    {classdata.class_name}
                </h1>

                <div className="bg-white self-end flex gap-3 items-end m-4 w-auto text-xl">
                    <img src={`http://localhost:8000/api${classdata.class_teacher.user_icon}`} alt="" width={50} height={50} />
                    <p className="self-center">
                        {classdata.class_teacher.user_last} {classdata.class_teacher.user_first} <small>先生</small>
                    </p>
                </div>
            </header>

            <main>
                <Notice class_id={classdata.class_id} notice_main={classdata.notice_classes[0].notice_main} />
                {userdata.user_grade === 2
                    ? <Assignment_teacher formatDate={formatDate} assignment={assignmentData} setAssignment={setAssignment} class_id={classdata.class_id} />
                    : <Assignment_students formatDate={formatDate} assignment={assignmentData} setAssignment={setAssignment} class_id={classdata.class_id} />
                }

            </main>
        </>
    )
}