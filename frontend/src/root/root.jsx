import Sidebar from './sidebar';
import { redirect } from "react-router-dom";
import {
    useLoaderData,
} from "react-router-dom";
import { useState } from 'react';

export async function LoadUserData() {
    const user = await fetch('http://localhost:8000/api/myaccount', {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => {
            // console.log(res);
            return res.json();
        })
        .then((data) => {
            // console.log(data);

            return data;
        });
    if (user.detail) {
        console.log('認証しろ');
        return redirect('/login')
    }
    else {
        console.log('逝ってヨシ！');

    }
    console.log(user);
    return { user };
}


export default function Root() {
    const { user } = useLoaderData();

    return (
        <>
            <Sidebar user={user} />
            <p>
            </p>
        </>
    )
}