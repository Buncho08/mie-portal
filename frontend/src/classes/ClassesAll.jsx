import { useLoaderData, Link } from "react-router-dom"
import { useState, useContext } from "react";
import Class from "./components/Class";
import TitleBar from "../public-components/TitleBar";
import SubTitleBar from "../public-components/SubTitleBar";
import CreateClasses from "./components/CreateClasses";
import Cookies from 'js-cookie';
import Confirmation from "../public-components/Confirmation";
import Alert from '../public-components/Alert'
import UpdateClass from "./components/UpdateClass";
import { UserData } from '../root/root';

export async function LoadClassesData() {
    const classes = await fetch('http://localhost:8000/api/classes', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    console.log(classes);
    const teachers = await fetch('http://localhost:8000/api/userView/teacher', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { classes, teachers }
}

export default function ClassesAll() {
    const { classes, teachers } = useLoaderData();
    const userdata = useContext(UserData);
    const [firstClasses, setFirstClasses] = useState(classes.first);
    const [secondClasses, setSecondClasses] = useState(classes.second);
    // 1 => 編集modal 2 => 削除モーダル
    const [viewModal, setViewModal] = useState(0);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    });
    const [target, setTarget] = useState({
        'target': '',
        'target_data': {},
    })
    const hundleSubmit = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('user_id', e.target.user_id.value)
        sendData.append('class_name', e.target.class_name.value)
        sendData.append('class_grade', e.target.class_grade.value)
        const status = await fetch('http://localhost:8000/api/classes', {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setAlert({
                        'message': data.error,
                        'disc': '',
                        'status': 1,
                    });
                    return 0;
                }

                if (e.target.class_grade.value == 0) {
                    setFirstClasses([...firstClasses, data])
                }
                else {
                    setSecondClasses([...secondClasses, data])
                }
                setAlert({
                    'message': `${data.class_name}を作成しました。`,
                    'disc': '時間割の設定もしてみましょう🖋',
                    'status': 0,
                });
                return data;
            })
            .catch((err) => console.log(err));


    }

    const hundleDelete = async (e) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/classes/update/${target.target_data.class_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setAlert({
                        'message': data.error,
                        'disc': '',
                        'status': 1,
                    });
                    return <></>
                }
                if (target.target_data.class_grade == 0) {
                    setFirstClasses(firstClasses.filter((data) => data.class_id !== target.target_data.class_id))
                }
                else {
                    setSecondClasses(secondClasses.filter((data) => data.class_id !== target.target_data.class_id))
                }
            })
            .catch((err) => console.log(err))
        setTarget({
            'target': '',
            'target_class_id': ''
        });
        setViewModal(0);
        setAlert({
            'message': `${target.target}を削除しました。`,
            'disc': '',
            'status': 0,
        });
        return <></>
    }

    const hundleUpdateName = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('user_id', e.target.user_id.value);
        sendData.append('class_name', e.target.class_name.value);
        const status = await fetch(`http://localhost:8000/api/classes/update/${target.target_data.class_id}`, {
            method: 'PATCH',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    setAlert({
                        'message': data.error,
                        'disc': '',
                        'status': 1,
                    });
                    return <></>
                }
                if (target.target_data.class_grade == 0) {
                    setFirstClasses(firstClasses.map((d) => (
                        d.class_id === target.target_data.class_id
                            ? data
                            : d
                    )))
                }
                else {
                    setSecondClasses(secondClasses.map((d) => (
                        d.class_id === target.target_data.class_id
                            ? data
                            : d
                    )))
                }
            })
            .catch((err) => console.log(err))

        setAlert({
            'message': `${target.target_data.class_name}の情報を更新しました。`,
            'disc': '',
            'status': 0,
        });
        return <></>
    }

    return (
        <div className={`h-screen`}>
            {
                viewModal === 1
                && (
                    <div className="animate-opacity-transition bg-cover-gray absolute h-full w-full top-0 left-0 z-30">
                        <UpdateClass teachers={teachers} target={target} setViewModal={setViewModal} hundleUpdateName={hundleUpdateName} />
                    </div>
                )
            }
            {
                // 削除確認
                viewModal === 2
                && (
                    <Confirmation target={target} dofunc={hundleDelete} setFlg={setViewModal} />
                )
            }
            {
                alert.message !== '' && (
                    <Alert alert={alert} setAlert={setAlert} />
                )
            }

            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around
            ">
                <TitleBar title={"授業一覧"} />

                <div className="self-end flex gap-3 items-center m-4 w-96 text-xl">
                    <Link
                        to={"http://localhost:3000/mie/timetable/"}
                        className="grid justify-center items-center text-banner hover:text-midnight h-12 w-44 rounded-lg">
                        時間割へ
                    </Link>
                </div>


            </header>
            <div className="w-[70%] mx-auto pb-10">
                {
                    userdata.user_grade === 2 && (
                        <details className="my-3 mt-6">
                            <summary className="grid items-center">
                                <div className="px-side">
                                    <h3 className="text-2xl font-bold">
                                        ▶ 授業を新しく作成する
                                    </h3>
                                    <div className="h-[0.1px] w-7/12 bg-midnight">

                                    </div>
                                </div>
                            </summary>
                            <CreateClasses teachers={teachers} hundleSubmit={hundleSubmit} />
                        </details>
                    )
                }
                <SubTitleBar title={'1年生'} />
                <Class classdata={firstClasses} setViewModal={setViewModal} setTarget={setTarget} user_grade={userdata.user_grade} />
                <SubTitleBar title={'2年生'} />
                <Class classdata={secondClasses} setViewModal={setViewModal} setTarget={setTarget} user_grade={userdata.user_grade} />
            </div>
        </div>
    )
}