import { useContext, useState, useEffect } from 'react';
import { UserData } from './root';
import { Link } from "react-router-dom";

export default function SideBar() {
    const user = useContext(UserData);
    const [nowPage, setNowPage] = useState(String(window.location.href).split('/')[4])
    return (
        <aside className="w-52 flex h-screen flex-col justify-between border-e bg-blue text-white">
            <div>
                {/* ロゴ */}
                <div className="m-5">
                    <svg
                        width="160"
                        height="50"
                        viewBox="0 0 112 38"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            className="text-64 fill-accent stroke fill"
                            d="m 222.44803,82.064984 4.992,46.463996 h -16.576 l -1.024,-33.151996 -6.4,33.151996 h -16.768 l -6.528,-32.895996 -0.96,32.895996 h -16.576 l 4.992,-46.463996 h 21.76 l 5.568,30.271996 4.864,-30.271996 z m 46.91603,12.736 q -7.616,-0.384 -11.264,-0.448 v 21.887996 q 3.712,-0.064 11.264,-0.448 v 12.736 h -37.184 v -12.736 q 7.36,0.384 11.2,0.448 V 94.352984 q -3.84,0.064 -11.2,0.448 v -12.736 h 37.184 z m 19.84395,22.015996 q 24.32,-0.128 35.264,-0.704 -0.448,2.624 -0.576,5.44 -0.064,2.752 -0.064,6.976 h -49.728 q 0.512,-12.416 0.512,-23.232 0,-10.815996 -0.512,-23.231996 h 49.728 v 11.584 h -34.624 v 6.144 q 3.072,0.064 9.088,0.064 10.176,0 21.056,-0.384 v 11.007996 q -10.88,-0.384 -21.056,-0.384 -6.016,0 -9.088,0.064 z m -182.03001,29.312 q 12.736,0 17.728,4.544 4.992,4.48 4.992,12.672 0,5.632 -1.984,9.6 -1.984,3.904 -6.976,6.144 -4.992,2.176 -13.76,2.176 H 93.865999 v 11.264 h -15.744 q 0.512,-12.416 0.512,-23.232 0,-10.816 -0.512,-23.232 h 15.744 v 0.064 z m -4.48,22.784 q 5.312,0 7.936,-0.384 2.688,-0.448 3.712,-1.536 1.088,-1.088 1.088,-3.2 0,-2.112 -1.024,-3.136 -0.96,-1.088 -3.648,-1.472 -2.624,-0.384 -8.064,-0.384 h -8.832001 v 10.112 z m 60.41999,24.256 q -14.656,0 -21.568,-6.336 -6.912,-6.4 -6.912,-17.92 0,-11.392 6.848,-17.792 6.912,-6.4 21.632,-6.4 14.784,0 21.632,6.4 6.912,6.4 6.912,17.792 0,11.584 -6.848,17.92 -6.848,6.336 -21.696,6.336 z m 0,-13.056 q 7.104,0 10.24,-2.688 3.136,-2.752 3.136,-8.512 0,-5.632 -3.136,-8.384 -3.136,-2.752 -10.24,-2.752 -7.04,0 -10.176,2.752 -3.136,2.752 -3.136,8.384 0,5.696 3.136,8.448 3.136,2.752 10.176,2.752 z m 84.67605,-18.56 q 0,5.568 -2.752,9.408 -2.688,3.84 -9.28,5.568 0.768,1.024 1.088,1.6 l 10.368,14.4 h -17.408 q -2.816,-5.248 -8.896,-14.848 h -9.408 v 14.848 h -15.104 q 0.512,-12.416 0.512,-23.232 0,-10.816 -0.512,-23.232 h 15.104 v 0.064 h 13.12 q 12.928,0 18.048,4.16 5.12,4.16 5.12,11.264 z m -36.288,-3.136 v 7.296 h 8.64 q 5.44,0 8.192,-0.32 2.816,-0.384 3.904,-1.152 1.088,-0.768 1.088,-2.24 0,-1.408 -1.024,-2.176 -1.024,-0.768 -3.84,-1.088 -2.816,-0.32 -8.32,-0.32 z m 92.80401,1.088 q -10.048,-0.32 -19.52,-0.384 v 33.408 h -16 v -33.408 q -9.536,0.064 -19.456,0.384 v -13.44 h 54.976 z m 40.00395,33.024 q -1.216,-3.648 -3.264,-9.152 h -20.416 l -3.2,9.152 H 301.37 l 17.92,-46.464 h 23.552 l 18.048,46.464 z m -6.912,-19.136 q -2.432,-6.72 -4.992,-13.44 l -1.536,-4.16 q -2.24,5.824 -6.592,17.6 z m 40.83603,6.208 q 18.56,-0.128 30.72,-0.64 -0.832,3.264 -1.024,6.272 -0.192,3.008 -0.192,7.296 h -45.12 q 0.512,-12.416 0.512,-23.232 0,-10.816 -0.512,-23.232 h 15.616 z"
                            transform="matrix(0.34123125,0,0,0.34123125,-26.65631,-27.658634)"
                            aria-label="MIE PORTAL" />
                    </svg>
                </div>
                {/* ロゴここまで */}


                {/*ロゴ以下 */}
                <div className="mx-2 mt-7">
                    {/* ユーザ情報エリア */}
                    <div className='mb-3 grid justify-center items-center'>
                        {/* アイコン */}
                        <img src={`http://localhost:8000/api${user.user_icon}`} alt="" width={130} height={130} />
                        {/* アイコンここまで */}
                        <div className='mt-2 text-center'>
                            <small>
                                {user.user_stdNum}
                            </small>
                            <p>
                                {user.user_last ? (`${user.user_last} ${user.user_first}さん`) : ('none さん')}
                            </p>
                        </div>
                    </div>
                    {/* ユーザ情報エリアここまで */}

                    {/* アイコン群 */}
                    <ul className="space-y-1 border-t border-gray-100 pt-4">
                        {/* マイページリンクアイコン */}
                        <li className='grid justify-center'>
                            <Link
                                to={'Mypage/'}
                                className={`
                                group relative flex justify-center rounded px-2 py-1.5  
                                ${nowPage == 'Mypage' ? ('') : ('hover:text-side-gray')}
                                hover:text-side-gray
                                `}
                                onClick={() => setNowPage('Mypage')}
                            >

                                <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="214px" height="214px" viewBox="0 0 512 512"
                                    className={`row-span-1 w-16 h-16 ${nowPage == 'Mypage' ? ('fill-white') : ('fill-side-gray hover:fill-white')}`} xmlSpace="preserve">

                                    <g>
                                        <polygon className="st0" points="442.531,218 344.828,120.297 256,31.469 167.172,120.297 69.438,218.047 0,287.469 39.984,327.453 
                                        109.406,258.031 207.156,160.281 256,111.438 304.844,160.281 402.531,257.984 472.016,327.453 512,287.469 	" ></polygon>
                                        <polygon className="st0" points="85.719,330.375 85.719,480.531 274.75,480.531 274.75,361.547 343.578,361.547 343.578,480.531 
                                        426.281,480.531 426.281,330.328 256.016,160.063"></polygon>
                                    </g>
                                </svg>

                                <span
                                    className={`absolute start-full w-16 top-1/2 text-center -translate-y-1/2 rounded bg-midnight px-2 py-1.5 text-xs font-medium text-white 
                                    ${nowPage == 'Mypage' ? ('invisible') : ('invisible group-hover:visible')}
                                    
                                    `}
                                >
                                    マイページ
                                </span>
                            </Link>
                        </li>
                        {/* マイページリンクアイコンここまで */}

                        {/* チームページ */}
                        <li className='grid justify-center'>
                            <Link
                                to={'team/'}
                                className={`
                                group relative flex justify-center rounded px-2 py-1.5  
                                ${nowPage == 'team' ? ('') : ('hover:text-side-gray')}
                                hover:text-side-gray
                                `}
                                onClick={() => setNowPage('team')}
                            >
                                <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="214px" height="214px" viewBox="0 0 512 512"
                                    className={`row-span-1 w-16 h-16 ${nowPage == 'team' ? ('fill-white') : ('fill-side-gray hover:fill-white')}`} xmlSpace="preserve">

                                    <g>
                                        <path className="st0" d="M256.495,96.434c26.632,0,48.213-21.597,48.213-48.205C304.708,21.58,283.128,0,256.495,0
		                                            c-26.65,0-48.222,21.58-48.222,48.229C208.274,74.837,229.846,96.434,256.495,96.434z"></path>
                                        <path className="st0" d="M298.267,119.279h-42.271h-42.271c-23.362,0-48.779,25.418-48.779,48.788v162.058
		                                            c0,11.685,9.463,21.156,21.148,21.156c5.743,0,0,0,14.756,0l8.048,138.206c0,12.434,10.078,22.513,22.513,22.513
		                                            c5.244,0,14.923,0,24.585,0c9.671,0,19.35,0,24.593,0c12.434,0,22.513-10.078,22.513-22.513l8.04-138.206
		                                            c14.764,0,9.013,0,14.764,0c11.676,0,21.148-9.471,21.148-21.156V168.067C347.054,144.697,321.636,119.279,298.267,119.279z"></path>
                                        <path className="st0" d="M104.141,149.083c23.262,0,42.105-18.85,42.105-42.104c0-23.262-18.843-42.112-42.105-42.112
		                                            c-23.27,0-42.104,18.851-42.104,42.112C62.037,130.232,80.871,149.083,104.141,149.083z"></path>
                                        <path className="st0" d="M408.716,149.083c23.27,0,42.104-18.85,42.104-42.104c0-23.262-18.834-42.112-42.104-42.112
		                                            c-23.253,0-42.104,18.851-42.104,42.112C366.612,130.232,385.463,149.083,408.716,149.083z"></path>
                                        <path className="st0" d="M137.257,169.024h-33.548h-36.92c-20.398,0-42.595,22.213-42.595,42.612v141.526
		                                            c0,10.212,8.264,18.476,18.468,18.476c5.018,0,0,0,12.884,0l7.024,120.704c0,10.852,8.805,19.658,19.666,19.658
		                                            c4.577,0,13.024,0,21.473,0c8.439,0,16.895,0,21.472,0c10.861,0,19.666-8.805,19.666-19.658l7.016-120.704v-6.849
		                                            c-8.98-8.856-14.606-21.082-14.606-34.664V169.024z"></path>
                                        <path className="st0" d="M445.211,169.024h-36.928h-33.54v161.101c0,13.582-5.626,25.808-14.615,34.664v6.849l7.017,120.704
		                                            c0,10.852,8.814,19.658,19.674,19.658c4.578,0,13.025,0,21.464,0c8.456,0,16.904,0,21.481,0c10.862,0,19.659-8.805,19.659-19.658
		                                            l7.032-120.704c12.883,0,7.865,0,12.883,0c10.204,0,18.468-8.265,18.468-18.476V211.636
		                                            C487.806,191.237,465.61,169.024,445.211,169.024z"></path>
                                    </g>
                                </svg>

                                <span
                                    className={`absolute start-full w-20 top-1/2 text-center -translate-y-1/2 rounded bg-midnight px-2 py-1.5 text-xs font-medium text-white 
                                    ${nowPage == 'team' ? ('invisible') : ('invisible group-hover:visible')}
                                    
                                    `}
                                >
                                    チームページ
                                </span>
                            </Link>
                        </li>
                        {/* チームページここまで */}
                        {/* みんなのページも作る */}
                    </ul>
                    {/* アイコン群ここまで */}
                </div>
            </div>


            <div className="sticky inset-x-0 bottom-0 border-t border-gray-100 bg-blue p-2">
                <form action="/logout">
                    <button
                        type="submit"
                        className="group relative flex w-full justify-center rounded-lg pxtrokeLinejoin-2 py-1.5 text-sm text-gray-500 hover:bg-midnight hover:text-white"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 opacity-75"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                            />
                        </svg>
                        ログアウト
                    </button>
                </form>
            </div>
        </aside>
    )
}