export default function LoginForm({ hundleForm, catchErr }) {

    // Login.jsxからhundleFormとcatchErrを使わせてもらいます。値が更新されたらLogin.jsxでも反応します。
    return (
        <>
            {/* ここからログインフォーム*/}
            <form className="w-96" onSubmit={e => hundleForm(e)}>
                {
                    catchErr.error
                        ? (
                            <p className="text-error text-xs">
                                ユーザー名 または、パスワードが違います。
                            </p>
                        )
                        : (<></>)
                }
                {/* ユーザーID */}
                <div className="mb-3">
                    <label
                        htmlFor="user_id"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="user_id"
                            autoComplete="username"
                            placeholder="英数字で6文字以上"
                            required
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:placeholder-side-gray focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className={`
                            absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all 
                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs
                            `}
                        >
                            ユーザーID
                        </span>
                    </label>

                </div>
                {/* ユーザーIDここまで */}

                {/* パスワードここから */}
                <div className="mb-3">
                    <label
                        htmlFor="password"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="password"
                            id="password"
                            placeholder="英数6文字以上"
                            autoComplete="new-password"
                            required
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:placeholder-side-gray focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                        >
                            パスワード
                        </span>
                    </label>
                </div>
                {/* パスワードここまで */}

                {/* アカウント作成エリアここから */}
                <div className="mt-8 sm:gap-4">
                    <button
                        type='submit'
                        className="inline-block cursor-pointer shrink-0 rounded-md border border-blue-600 bg-banner px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-banner focus:outline-none focus:ring active:text-blue-500"
                    >
                        ログイン
                    </button>
                </div>
                {/* アカウント作成エリアここまで */}
            </form >
            {/* ログインフォームここまで */}
        </>
    )
}