import Sidebar from './sidebar';
import { redirect, Outlet, useLoaderData, useNavigate } from "react-router-dom";

import { createContext, useState } from 'react';

// リフレッシュトークンを使うとめんどくさいので、使いません。ログイン期限は長めに設定しておきます。
export async function LoadUserData() {
    // 認証が正常に処理できたかどうかのフラグ。うまくいかなかったら/loginにリダイレクトされます。
    // トークン切れると401が返ってきます。
    const userdata = await fetch('http://localhost:8000/api/myaccount', {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => {
            if (res.status == 401) {
                return false;
            }
            else {
                return res.json();
            }
        })
        .then((data) => {
            return data;
        })
        .catch(err => console.log(err));
    if (userdata === false) {
        return redirect('/login');
    }
    else {
        return { userdata };
    }
}

// 子componentで扱える変数のようなもの。
// UserData.provider value={}で渡せば下のcomponentで使えます。
export const UserData = createContext(null);

export default function Root() {
    // ローダから受け取った値を使うよ
    const { userdata } = useLoaderData();

    return (
        <UserData.Provider value={userdata}>
            <div className='flex'>
                <Sidebar />
                <div className="w-full overflow-y-auto">
                    <Outlet />
                </div>
            </div>
        </UserData.Provider>
    )
}