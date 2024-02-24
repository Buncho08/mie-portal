import { useState } from 'react';
import LoginForm from './components/login-form';
import { Link, Navigate } from "react-router-dom";

/*
    新規登録ページの親コンポーネント
    子componentは
    login-form.jsx
 */

export default function Signin() {
    const [catchErr, setErr] = useState({});
    const [loginStatus, setLoginStatus] = useState(false);

    // 新規登録フォームでfetch処理を行う
    const hundleForm = async (e) => {
        e.preventDefault();
        // エラーを受け取ったとき用のフラグ
        // 0 : 登録完了
        // 1 : エラー
        let flg = 0;
        if ((e.target.password.value !== e.target.password_again.value) || e.target.password.value === '') {
            console.log('ちがう');
        }
        else {
            const signinData = new FormData();
            signinData.append("user_id", e.target.user_id.value);
            signinData.append("user_stdNum", e.target.user_stdNum.value);
            signinData.append('user_last', e.target.user_last.value);
            signinData.append('user_first', e.target.user_first.value);
            signinData.append("user_grade", e.target.user_grade.value);
            signinData.append("password", e.target.password.value);

            const response = await fetch(
                "http://localhost:8000/api/signup", {
                method: 'POST',
                body: signinData,
            })
                .then((res) => {
                    if (!res.ok) {
                        flg = 1;
                    }

                    return res.json();
                })
                .then((data) => {
                    if (flg) {
                        const errStatus = {
                            'user_id': data.user_id,
                            'user_stdNum': data.user_stdNum,
                        };
                        // setErr()でerror文をセット。セットすると、これを用いている部分が自動で更新されます。(反応する)
                        setErr(errStatus);
                    }
                    else {
                        // エラーなしなので、すでにあるエラー文等をリセット
                        setErr({});
                    }
                })
                .catch((err) => {
                    // 一応。
                    console.log(err);
                    flg = 1;
                });

            // サインアップできたら
            if (!flg) {
                console.log('こん');
                const authData = new FormData();
                authData.append("user_id", e.target.user_id.value);
                authData.append("password", e.target.password.value);

                const login = await fetch(
                    "http://localhost:8000/auth/",
                    {
                        method: "POST",
                        credentials: "include",
                        body: authData
                    }
                )
                    .then((res) => {
                        console.log(res);
                        return (res.json())
                    })
                    .then((data) => {
                        setLoginStatus(true);
                        console.log(data);
                    })
                    .catch((err) => {
                        console.log(err);
                    })
            }

        }
    }

    return (
        <>
            {/* ログインできたらリダイレクト */}
            {loginStatus && (
                <Navigate to="/mie/Mypage" replace={true} />
            )}

            {/* ここから新規登録ページ */}
            <section className="bg-white">
                <div className="lg:grid lg:min-h-screen lg:grid-cols-12">
                    {/* ここからひだりの画像 */}
                    <aside className="relative block h-36 lg:col-span-5 lg:h-full xl:col-span-4">
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
                                ようこそ
                            </h1>
                            <LoginForm
                                // コンポーネントにfunctionとstateを使っていいよと渡しています。
                                // →login-form.jsxへ 
                                hundleForm={hundleForm}
                                catchErr={catchErr}
                            />
                            <p className="mt-10 text-sm text-gray-500 sm:mt-6">
                                すでにアカウントをお持ちですか？
                                <Link to={'/login'} className="text-gray-700 underline  hover:text-tahiti">ログイン</Link>
                            </p>
                        </div>
                    </main>
                </div>
            </section>
        </>
    )
}