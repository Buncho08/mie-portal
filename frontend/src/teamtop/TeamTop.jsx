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
    const teamlist = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team`, {
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
    });
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ];
    const hundleAddTeam = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('team_grade', e.target.team_grade.value);
        sendData.append('team_name', e.target.team_name.value);
        sendData.append('user_id', userdata.user_id);
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team`, {
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
                className={`
                h-32 ${bgList[2]} bg-center flex justify-around px-side-side
                `}>
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