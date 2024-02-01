export default function LoginForm({ hundleForm, catchErr }) {
    // Login.jsxからhundleFormとcatchErrを使わせてもらいます。値が更新されたらLogin.jsxでも反応します。
    return (
        <>
            {/* ここからログインフォーム*/}
            <form className="w-96" onSubmit={e => hundleForm(e)}>

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
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:placeholder-side-gray focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className={`
                            absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all 
                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs
                            ${catchErr.user_id ? 'text-error' : ''}
                            `}
                        >
                            ユーザーID
                        </span>
                    </label>
                    {
                        catchErr.user_id
                            ? (
                                <p className="text-error text-xs">
                                    {catchErr.user_id}
                                </p>
                            )
                            : (<></>)
                    }
                </div>
                {/* ユーザーIDここまで */}

                {/* 学生番号 */}
                <div className="mb-6">
                    <label
                        htmlFor="user_stdNum"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="user_stdNum"
                            placeholder="202252000"
                            autoComplete="off"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:placeholder-side-gray focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className={`
                            absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all 
                            peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs
                            ${catchErr.user_stdNum ? 'text-error' : ''}
                            `}
                        >
                            学生番号
                        </span>
                    </label>
                    {
                        catchErr.user_stdNum
                            ? (
                                <p className="text-error text-xs">
                                    {catchErr.user_stdNum}
                                </p>
                            )
                            : (<></>)
                    }
                </div>
                {/* 学生番号ここまで */}

                {/* 学年選択ここから */}
                <fieldset className="mb-3 grid grid-cols-2 gap-3">
                    <legend className="sr-only">学年</legend>


                    <div className='col-span-1'>
                        <input type="radio" name="user_grade" value="0" id="first" className="peer hidden" defaultChecked />

                        <label
                            htmlFor="first"
                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-banner peer-checked:bg-banner peer-checked:text-white"
                        >
                            <p className="text-sm font-medium">1年</p>
                        </label>
                    </div>

                    <div className='col-span-1'>
                        <input type="radio" name="user_grade" value="1" id="second" className="peer hidden" />

                        <label
                            htmlFor="second"
                            className="flex cursor-pointer items-center justify-center rounded-md border border-gray-100 bg-white px-3 py-2 text-gray-900 hover:border-gray-200 peer-checked:border-banner peer-checked:bg-banner peer-checked:text-white"
                        >
                            <p className="text-sm font-medium">2年</p>
                        </label>
                    </div>

                </fieldset>
                {/* 学年選択ここまで */}

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

                {/* パスワード確認ここから */}
                <div className="mb-6">
                    <label
                        htmlFor="password_again"
                        className="relative block overflow-hidden border-b border-gray-200 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="password"
                            id="password_again"
                            placeholder="英数6文字以上"
                            autoComplete="new-password"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:placeholder-side-gray focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                        >
                            パスワードの確認
                        </span>
                    </label>
                </div>
                {/* パスワード確認ここまで */}


                {/* アカウント作成エリアここから */}
                <div className="mt-8 sm:gap-4">
                    <button
                        type='submit'
                        className="inline-block cursor-pointer shrink-0 rounded-md border border-blue-600 bg-banner px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-banner focus:outline-none focus:ring active:text-blue-500"
                    >
                        アカウントを作成
                    </button>
                </div>
                {/* アカウント作成エリアここまで */}
            </form >
            {/* ログインフォームここまで */}
        </>
    )
}