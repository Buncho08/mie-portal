import { redirect, useLoaderData, Navigate } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { UserData } from '../root/root';
import Cookies from 'js-cookie';
import ChatArea from "./components/ChatArea";
import File from "./components/file";
import TeamLink from "./components/link";
import TitleBar from "../public-components/TitleBar";
import Alert from '../public-components/Alert';
import Confirmation from "../public-components/Confirmation";

export async function LoadTeamPageData({ params }) {
    const teamdata = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/chat/${params.team_id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    const teamfile = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/file/${params.team_id}`, {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    const teamlink = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/link/${params.team_id}`, {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { teamdata, teamfile, teamlink }
}


export default function TeamPage() {
    const { teamdata, teamfile, teamlink } = useLoaderData();
    const [edit, setEdit] = useState(false);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    });
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ]
    const [viewModal, setViewModal] = useState(false);
    const userdata = useContext(UserData);
    const [target, setTarget] = useState({
        'target': teamdata.team_name,
        'target_data': teamdata
    });
    const [rd, setRd] = useState(false);
    const hundleChangeTeamName = async (e) => {
        e.preventDefault();
        if (e.target.team_name.value.length <= 0) {
            return <></>
        }
        const sendData = new FormData();
        sendData.append('team_name', e.target.team_name.value);
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/change/${teamdata.team_id}`, {
            method: 'PATCH',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        if (status.error) {
            setAlert({
                'message': status.error,
                'disc': '',
                'status': 1
            })
            return <></>
        }
        setEdit(false);
        setAlert({
            'message': 'スレッド名を変更しました✨',
            'disc': '',
            'status': 0
        })
        return 0
    }

    const hundleDeleteTeam = async (e) => {
        e.preventDefault();
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/delete/${teamdata.team_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err));
        setRd(true);
        return <></>;
    }
    return (
        <div className="h-screen">
            {
                rd && (
                    <Navigate to="/mie/team" replace={true} />
                )
            }
            {
                // 削除確認
                viewModal
                && (
                    <Confirmation target={target} dofunc={hundleDeleteTeam} setFlg={setViewModal} />
                )
            }
            <header
                className={`
                h-[12%] ${bgList[0]} bg-center flex justify-around px-side-side
                `}>
                {
                    teamdata.team_admin.user_id === userdata.user_id || userdata.user_grade === 2 ? (
                        <>
                            {
                                edit
                                    ? (
                                        <form
                                            onSubmit={(e) => hundleChangeTeamName(e)}
                                            className="w-full px-4 pt-7 font-bold flex items-center col-span-4">
                                            <input type="text" name="team_name" id="team_name" maxLength="30" defaultValue={teamdata.team_name}
                                                className="text-4xl" />
                                            <button
                                                type="submit"
                                            >
                                                変更
                                            </button>
                                        </form>
                                    )
                                    : (
                                        <Fragment>
                                            <TitleBar title={[`${teamdata.team_name}`, <small className="ml-3" key={'small'}>スレッド</small>, <button onClick={() => setEdit(true)} className="text-lg">🖋</button>]} />
                                            <div className="grid items-end pb-4">
                                                <button
                                                    onClick={() => setViewModal(true)}
                                                >
                                                    🗑️
                                                </button>
                                            </div>
                                            <div className="self-end pb-4 w-80">
                                                作成者 : {teamdata.team_admin.user_last} {teamdata.team_admin.user_first}
                                            </div>
                                        </Fragment>
                                    )
                            }
                        </>
                    )
                        :
                        (
                            <Fragment>
                                <TitleBar title={[`${teamdata.team_name}`, <small className="ml-3" key={'small'}>スレッド</small>]} />
                                <div className="self-end pb-4 w-[30%]">
                                    作成者 : {teamdata.team_admin.user_last} {teamdata.team_admin.user_first}
                                </div>
                            </Fragment>
                        )
                }
            </header>
            <div className="flex h-[87%] w-full">
                <div className="w-[60%] h-full">
                    <File team_id={teamdata.team_id} teamfile={teamfile} setAlert={setAlert} />
                    <TeamLink team_id={teamdata.team_id} teamlink={teamlink} setAlert={setAlert} />
                </div>
                <ChatArea teammessage={teamdata.team_message} team_id={teamdata.team_id} />
            </div>
            {
                alert.message !== '' && (
                    <Alert alert={alert} setAlert={setAlert} />
                )
            }
        </div>
    )
}
