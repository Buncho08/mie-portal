import Sidebar from './sidebar';
import { redirect, Outlet, useNavigate } from "react-router-dom";
import {
    useLoaderData,
} from "react-router-dom";
import { createContext, useContext, useState } from 'react';
import MypageTop from '../mypage/MypageTop';
// ユーザ情報をグローバルに扱えるContext Hook! 
// ほかのcomponentから取得できます。

// リフレッシュトークンでアクセストークンを取得する
const refreshAuth = async (data) => {

    const authData = new FormData();
    authData.append('refresh', data.refresh_token);
    console.log('refresh_token', data.refresh_token);

    const getAccessToken = fetch('http://localhost:8000/auth/refresh', {
        method: 'POST',
        body: authData,
        credentials: "include",
    })
        .then(res => {
            return res.json();
        })
        .then(data => {
            return <></>;
        })
        .catch((err) => {
            console.log(err);
        })
}

const refreshGet = async () => {

    const refresh = await fetch('http://localhost:8000/auth/refresh/get', {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => {
            console.log('アクセストークン期限切れ処理');
            if (res.status == 401) {
                // リフレッシュトークンも期限切れ
                // loadUserDataへ行ってリダイレクト
                return false;
            }
            else {
                // 取得できたとき
                console.log('refreshします');
                return res.json();
            }
        })
        .then((data) => {
            // リフレッシュトークンでアクセストークンを取得する
            if (data) {
                console.log('aaaaaaaaaaaa');
                refreshAuth(data);
                return true;
            }
            else {
                return false;
            }
        });

    return refresh;
}


export async function LoadUserData() {
    // 認証が正常に処理できたかどうかのフラグ。うまくいかなかったら/loginにリダイレクトされます。
    console.log('aaa')
    // トークン切れると401が返ってきます。
    // 401が返ってきたら、リフレッシュトークンを取得して、アクセストークンを取得します。
    const userdata = await fetch('http://localhost:8000/api/myaccount', {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => {
            if (res.status == 401) {
                console.log('トークン認証切れ');
                return refreshGet();
            }
            else {
                return res.json();
            }
        })
        .then((data) => {
            console.log(data);
            return data;
        })
        .catch(err => console.log(err));


    if (userdata === true) {
        return redirect('/mie/Mypage');
    }
    else if (userdata === false) {
        return redirect('/login');
    }
    else {
        return { userdata };
    }
}

export const UserData = createContext(null);

export default function Root() {
    // ローダから受け取った値を使うよ
    const { userdata } = useLoaderData();

    return (
        <>
            <UserData.Provider value={userdata}>
                <div className='flex'>
                    <Sidebar />
                    <div className="bg-side-gray w-full grid-row-3">
                        <Outlet />
                    </div>

                </div>
            </UserData.Provider>
        </>
    )
}