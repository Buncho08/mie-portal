import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import User from "./components/user";
import UserModal from "./components/usermodal";
import TitleBar from "../public-components/TitleBar";
import SubTitleBar from "../public-components/SubTitleBar";

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
        <div className={`h-screen`}>
            {
                Object.keys(viewUser).length > 0 && (
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0">
                        <UserModal userdata={viewUser} setViewUser={setViewUser} />
                    </div>
                )
            }
            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around px-side-side
            ">
                <TitleBar title={'みんなのプロフィール'} />

            </header>

            <div className="px-side-side">
                <SubTitleBar title={'1年生'} />

                <User usersdata={usersdata.first} setViewUser={setViewUser} />
                <SubTitleBar title={'2年生'} />

                <User usersdata={usersdata.second} setViewUser={setViewUser} />

                <SubTitleBar title={'教師'} />
                <User usersdata={usersdata.teacher} setViewUser={setViewUser} />
            </div>
        </div>
    )
}