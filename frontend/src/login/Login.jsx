import { useState } from 'react';
import LoginForm from './components/LoginForm';
import {
    redirect,
} from "react-router-dom";

import { Link, Navigate } from "react-router-dom";

export async function LoadLoggedStatus() {
    const status = await fetch('http://localhost:8000/api/check', {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => {
            if (res.status == 401) {
                return false;
            }
            else {
                return true;
            }
        })

    if (status) {
        return redirect('/mie/mypage');
    }
    else {
        return { status };
    }
}

export default function Login() {
    // エラー文を表示
    const [catchErr, setErr] = useState({});
    // ログインしたらtrueでredirectさせるためのstate
    const [loginStatus, setLoginStatus] = useState(false);


    // ログインフォームでfetch処理を行う
    const hundleForm = async (e) => {
        e.preventDefault();
        // エラーを受け取ったとき用のフラグ
        // 0 : 登録完了
        // 1 : エラー
        let flg = 0;

        const signinData = new FormData();
        signinData.append("user_id", e.target.user_id.value);
        // signinData.append("user_stdNum", e.target.user_stdNum.value);
        signinData.append("password", e.target.password.value);

        await fetch(
            "http://localhost:8000/auth/", {
            method: 'POST',
            credentials: "include",
            body: signinData,
        })
            .then((res) => {
                if (!res.ok) {
                    flg = 1;
                }
                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (flg) {
                    const errStatus = {
                        'error': data.detail,
                    };
                    // setErr()でerror文をセット。セットすると、これを用いている部分が自動で更新されます。(反応する)
                    setErr(errStatus);
                }
                else {
                    // エラーなしなのでマイページに遷移
                    setErr({});
                    setLoginStatus(true);
                }
            })
            .catch((err) => {
                // 一応。
                console.log(err);
                flg = 1;
            });
    }


    return (
        <>
            {/* ログインできたらリダイレクト */}
            {loginStatus && (
                <Navigate to="/mie/Mypage" replace={true} />
            )}
            {/* ここからログインページ */}
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    {/* ここからひだりの画像 */}
                    <aside className="relative block h-36 lg:order-last lg:col-span-5 lg:h-full xl:col-span-4">
                        <img
                            alt="Pattern"
                            src="/top.png"
                            className="absolute inset-0 h-full w-full object-cover"
                        />
                        {/* レスポンシブ対応しています width640px 以下になると、上のバナー画像になります。 */}
                    </aside>
                    {/* ひだりの画像ここまで */}

                    {/* ここからメイン領域 */}
                    <main
                        className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-8"
                    >
                        <div className="max-w-4xl lg:max-w-3xl">
                            <a className="block text-blue-600">
                                <span className="sr-only">Home</span>
                                <img src="/top-logo.svg" alt="松本情報工科専門学校" />
                            </a>
                            {/* トップのロゴです。a要素でクリックしてトップページへ飛ぶようになっています。 */}

                            <h1 className="my-7 text-3xl font-bold text-gray-900 sm:text-3xl md:text-3xl">
                                おかえりなさい
                            </h1>
                            <LoginForm
                                // コンポーネントにfunctionとstateを使っていいよと渡しています。
                                // →login-form.jsxへ 
                                hundleForm={hundleForm}
                                catchErr={catchErr}
                            />
                            <p className="mt-10 text-sm text-gray-500 sm:mt-6">
                                アカウントをお持ちではないですか？
                                <Link to={'/signin'} className="text-gray-700 underline  hover:text-tahiti">新規登録</Link>
                                {/* <a href="#" className="text-gray-700 underline  hover:text-tahiti">新規登録</a>. */}
                            </p>
                        </div>
                    </main>
                </div>
            </section >
        </>
    )

}