import { useLoaderData } from "react-router-dom";
import { Fragment, useContext, useState, useEffect } from "react";
import { UserData } from '../root/root';
import Cookies from 'js-cookie';
import Chat from "./components/chat";
import File from "./components/file";
import TeamLink from "./components/link";


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


    return (
        <div className="h-screen">
            <div className="bg-banner h-[10%] flex items-center px-3 text-xl">
                <h2>
                    {teamdata.team_name}  <small>チーム</small>
                </h2>
            </div>
            <div className="flex h-[90%] w-full">
                <div className="w-[70%] h-full bg-blue">
                    <File team_id={teamdata.team_id} teamfile={teamfile} />
                    <TeamLink team_id={teamdata.team_id} teamlink={teamlink} />
                </div>
                <Chat teammessage={teamdata.team_message} team_id={teamdata.team_id} />
            </div>
        </div>
    )
}
