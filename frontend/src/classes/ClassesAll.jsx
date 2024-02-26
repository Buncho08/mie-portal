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
    const classes = await fetch(`${import.meta.env.VITE_BACKEND_URI}/classes`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    console.log(classes);
    const teachers = await fetch(`${import.meta.env.VITE_BACKEND_URI}/userView/teacher`, {
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
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ]
    const rd = Math.floor(Math.random() * 4);
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
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/classes`, {
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
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/classes/update/${target.target_data.class_id}`, {
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
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/classes/update/${target.target_data.class_id}`, {
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
                className={`
                h-32 ${bgList[rd]} bg-center flex justify-around px-side-side
                `}>
                <TitleBar title={"授業一覧"} />

                <div className="self-end flex gap-3 items-center m-4 w-96 text-xl">
                    <Link
                        to={"/mie/timetable/"}
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