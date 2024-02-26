import { Fragment, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import AddTeam from "./components/addTeam";
import Cookies from 'js-cookie';
import TitleBar from '../public-components/TitleBar';
import TeamList from "./components/TeamList";
import { UserData } from '../root/root';
import { useContext } from "react";
import Alert from '../public-components/Alert';

export async function LoadTeamData() {
    const teamlist = await fetch('http://localhost:8000/api/team', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { teamlist }
}



export default function TeamTop() {
    const { teamlist } = useLoaderData();
    const [team, setTeam] = useState(teamlist);
    const [viewFlg, setViewFlg] = useState(0);
    const userdata = useContext(UserData);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    })
    const hundleAddTeam = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('team_grade', e.target.team_grade.value);
        sendData.append('team_name', e.target.team_name.value);
        sendData.append('user_id', userdata.user_id);
        const status = await fetch('http://localhost:8000/api/team', {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err));
        if (status.error) {
            setAlert({
                'message': status.error,
                'disc': '',
                'status': 1
            });
        }
        else {
            setTeam([...team, status]);
            setAlert({
                'message': 'チームを作成しました✨',
                'disc': '',
                'status': 0
            });
            setViewFlg(0);
        }
    }

    const hundleViewModal = (e, grade) => {
        e.preventDefault();
        setViewFlg(grade);
        return <></>
    }

    return (
        <div className={`h-screen`}>
            {
                viewFlg > 0 && (
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0 z-50">
                        <AddTeam hundleAddTeam={hundleAddTeam} setViewFlg={setViewFlg} viewFlg={viewFlg} />
                    </div>
                )
            }
            {
                alert.message !== "" && (
                    <Alert alert={alert} setAlert={setAlert} />
                )
            }
            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around px-side-side
            ">
                <TitleBar title={'チームスレッド'} />

            </header>
            <div className="px-side-side">
                <div className="grid grid-cols-6 px-side py-yspace">
                    <h2 className="grid items-center px-1 text-2xl font-bold col-start-1 col-span-2 row-span-1 row-start-1">
                        1年生
                    </h2>
                    <button onClick={(e) => hundleViewModal(e, 1)}
                        className="mb-2 relative w-72 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gradient-to-br from-gray-100 via-gray-200 to-gray-200 rounded-xl group">
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-100 ease-in-out bg-gradient-to-br from-sky-600 via-banner to-sky-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-400 ease-in-out delay-200 -translate-x-full translate-y-full bg-gradient-to-br from-sky-600 via-banner to-sky-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-gray-900 text-center transition-colors duration-200 ease-in-out group-hover:text-white">
                            ＋1年生のスレッドを作成する
                        </span>
                    </button>
                    <div className="h-[0.1px] w-7/12 bg-midnight col-span-6 row-start-2">

                    </div>
                </div>
                <div>
                    <ul className="px-side-side text-base">
                        {team.map((data, index) => (
                            <Fragment key={data.team_id ? data.team_id : index * 11}>
                                {
                                    data.team_grade == 0 && (
                                        <TeamList data={data} />
                                    )
                                }
                            </Fragment>
                        ))}
                    </ul>
                </div>
                <div className="grid grid-cols-6 px-side py-yspace">
                    <h2 className="grid items-center px-1 text-2xl font-bold col-start-1 col-span-2 row-span-1 row-start-1">
                        2年生
                    </h2>
                    <button onClick={(e) => hundleViewModal(e, 2)}
                        className="mb-2 relative w-72 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gradient-to-br from-gray-100 via-gray-200 to-gray-200  rounded-xl group">
                        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-100 ease-in-out bg-gradient-to-br from-sky-600 via-banner to-sky-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                            <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                        </span>
                        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-400 ease-in-out delay-200 -translate-x-full translate-y-full bg-gradient-to-br from-sky-600 via-banner to-sky-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                        <span className="relative w-full text-gray-900 text-center transition-colors duration-200 ease-in-out group-hover:text-white">
                            ＋2年生のスレッドを作成する
                        </span>
                    </button>
                    <div className="h-[0.1px] w-7/12 bg-midnight col-span-6 row-start-2">

                    </div>
                </div>
                <div>
                    <ul className="px-side-side text-base">
                        {team.map((data, index) => (
                            <Fragment key={data.team_id ? data.team_id : index * 10}>
                                {
                                    data.team_grade == 1 && (
                                        <TeamList data={data} />
                                    )
                                }
                            </Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div >


    )
}