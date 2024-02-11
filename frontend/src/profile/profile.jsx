import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import User from "./components/user";
import UserModal from "./components/usermodal";


export async function LoadUsersData() {
    const usersdata = await fetch(`http://localhost:8000/api/userView`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    return { usersdata }
}

export default function Profile() {
    const { usersdata } = useLoaderData();
    const [viewUser, setViewUser] = useState({});
    return (
        <div className={`h-screen ${Object.keys(viewUser).length > 0 ? 'relative' : ''}`}>
            {
                Object.keys(viewUser).length > 0 && (
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0">
                        <UserModal userdata={viewUser} setViewUser={setViewUser} />
                    </div>
                )
            }
            <div className="w-full h-14 bg-blue p-2 flex items-center">
                <h2 className="text-2xl">
                    みんなのプロフィール
                </h2>
            </div>
            <div id="main">
                <div id="first" className="bg-slate-400 p-2 flex items-center justify-between">
                    <h3 className="text-lg">
                        1年生
                    </h3>
                </div>

                <User usersdata={usersdata.first} setViewUser={setViewUser} />

                <div id="first" className="bg-slate-400 p-2 flex items-center justify-between">
                    <h3 className="text-lg">
                        2年生
                    </h3>
                </div>

                <User usersdata={usersdata.second} setViewUser={setViewUser} />

                <div id="first" className="bg-slate-400 p-2 flex items-center justify-between">
                    <h3 className="text-lg">
                        教師
                    </h3>
                </div>
                <User usersdata={usersdata.teacher} setViewUser={setViewUser} />
            </div>
        </div>
    )
}