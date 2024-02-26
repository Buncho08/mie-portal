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
    const teamdata = await fetch(`http://localhost:8000/api/team/chat/${params.team_id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    const teamfile = await fetch(`http://localhost:8000/api/team/file/${params.team_id}`, {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    const teamlink = await fetch(`http://localhost:8000/api/team/link/${params.team_id}`, {
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
        const status = await fetch(`http://localhost:8000/api/team/change/${teamdata.team_id}`, {
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
        const status = await fetch(`http://localhost:8000/api/team/delete/${teamdata.team_id}`, {
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
                className="
            h-[12%] bg-[url('/class_bg.webp')] bg-center flex
            ">
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
