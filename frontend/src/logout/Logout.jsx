import Cookies from 'js-cookie';

export default function Logout({ setFlg }) {
    const hundleLogout = async () => {
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/logout`, {
            method: 'POST',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))
        location.reload()
        return <></>
    }
    return (
        <div id="hs-sign-out-alert-small-window" className={`bg-cover-gray z-10 p-20 animate-opacity-transition size-full fixed top-0 start-0 overflow-x-hidden `}>
            <div className={`mt-0 animate-scale-up-center sm:max-w-xs sm:w-full m-3 sm:mx-auto`}>
                <div className="relative flex flex-col bg-white shadow-lg rounded-xl">
                    <div className="absolute top-2 end-2">
                        <button
                            onClick={() => setFlg(false)}
                            type="button" className="flex justify-center items-center size-7 text-sm font-semibold rounded-lg border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:border-transparent dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600" data-hs-overlay="#hs-sign-out-alert-small-window">
                            <span className="sr-only">Close</span>
                            <svg className="flex-shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
                        </button>
                    </div>

                    <div className="p-4 sm:p-10 text-center overflow-y-auto">

                        <span className="mb-4 inline-flex justify-center items-center size-[62px] rounded-full border-4 border-yellow-50 bg-yellow-100 text-yellow-500 dark:bg-yellow-700 dark:border-yellow-600 dark:text-yellow-100">
                            <svg className="flex-shrink-0 size-5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                            </svg>
                        </span>

                        <h3 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-200">
                            ログアウト
                        </h3>
                        <p className="text-gray-500">
                            ログアウトしても <br />
                            よろしいでしょうか？
                        </p>

                        <div className="mt-6 grid gap-y-2">
                            <button
                                onClick={() => hundleLogout()}
                                className="py-2.5 px-4 w-full inline-flex justify-center items-center gap-2 rounded-lg border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-indigo-500 transition-all text-sm" href="#">
                                ログアウト
                            </button >
                            <button type="button"
                                onClick={() => setFlg(false)}
                                className="py-2.5 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-indigo-700 text-white hover:bg-indigo-800 disabled:opacity-50 disabled:pointer-events-none" data-hs-overlay="#hs-sign-out-alert-small-window">
                                もどる
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}