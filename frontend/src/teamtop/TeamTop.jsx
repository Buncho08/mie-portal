import { Fragment, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import AddTeam from "./addTeam";
import Cookies from 'js-cookie';

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

    const hundleAddTeam = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('team_grade', e.target.team_grade.value);
        sendData.append('team_name', e.target.team_name.value);
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
            .then((data) => setTeam([...team, data]))
            .catch((err) => console.log(err))
    }

    return (
        <div className="w-full h-full">
            <div className="w-full h-14 bg-blue p-2 flex items-center">
                <h2 className="text-2xl">
                    チーム
                </h2>
            </div>

            <div id="main">
                <div id="first" className="bg-slate-400 p-2 flex items-center justify-between">
                    <h3 className="text-lg">
                        1年生
                    </h3>
                    <AddTeam hundleAddTeam={hundleAddTeam} team_grade={0} />
                </div>
                <div>
                    <ul className="p-2 text-base">
                        {team.map((data) => (
                            <Fragment key={data.team_id && data.team_id}>
                                {
                                    data.team_grade == 0 && (
                                        <li>
                                            <Link key={data.team_id} to={`${data.team_id}`} className="hover:text-banner">
                                                {data.team_name}
                                            </Link>
                                        </li>
                                    )
                                }
                            </Fragment>
                        ))}
                    </ul>
                </div>
                <div id="second" className="bg-slate-400 p-2 flex items-center justify-between">
                    <h3 className="text-lg">
                        2年生
                    </h3>

                    <AddTeam hundleAddTeam={hundleAddTeam} team_grade={1} />
                </div>
                <div>
                    <ul className="p-2 text-base">
                        {team.map((data) => (
                            <Fragment key={data.team_id && data.team_id}>
                                {
                                    data.team_grade == 1 && (
                                        <li>
                                            <Link key={data.team_id} to={`${data.team_id}`} className="hover:text-banner">
                                                {data.team_name}
                                            </Link>
                                        </li>
                                    )
                                }
                            </Fragment>
                        ))}
                    </ul>
                </div>
            </div>
        </div>


    )
}