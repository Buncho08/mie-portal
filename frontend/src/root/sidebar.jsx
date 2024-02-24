import { useContext, useState, useEffect } from 'react';
import { UserData } from './root';
import { Link } from "react-router-dom";
import Logout from '../logout/Logout';

export default function SideBar() {
    const user = useContext(UserData);
    const [nowPage, setNowPage] = useState(String(window.location.href).split('/')[4]);
    const [logout, setLogout] = useState(false);

    return (
        <aside className="w-52 flex h-screen flex-col justify-between border-e bg-blue text-white">
            {
                logout && (
                    <Logout setFlg={setLogout} userdata={user} />
                )
            }
            <div>
                {/* ロゴ */}
                <div className="m-5">
                    <Link to={'/mie/Mypage'}>
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
                    </Link>
                </div>
                {/* ロゴここまで */}


                {/*ロゴ以下 */}
                <div className="mx-2 mt-7">
                    {/* ユーザ情報エリア */}
                    <div className='mb-3 grid justify-center items-center'>
                        {/* アイコン */}
                        <Link to={'/mie/settings'}>
                            <img src={`http://localhost:8000/api${user.user_icon}`} alt="" width={130} height={130} className='rounded-full' />
                        </Link>

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
                    <ul className="list-none m-0 space-y-1 border-t border-gray-100 pt-2">
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
                                        <path className="st0" d="M85.09,225.65c0-25.46,5.277-49.897,15.369-72.591C39.291,172.32,0,220.374,0,276.675
		                            c0,52.253,28.789,97.387,85.449,119.056c2.971,1.127,4.508,4.355,3.432,7.325c-4.303,12.296-9.836,24.079-13.781,32.019
		                            c-2.1,4.201,1.486,9.067,6.098,8.3c32.684-5.686,62.908-20.287,85.553-33.35c0.82-0.462,1.69-0.716,2.562-0.716
		                            c16.137-0.564,34.832-3.512,48.973-6.533C137.785,374.275,85.09,305.262,85.09,225.65z"></path>
                                        <path className="st0" d="M415.68,363.812c62.789-26.58,96.32-78.466,96.32-138.166c0-86.764-80.736-157.102-192.965-157.102
		                            s-192.963,70.338-192.963,157.102c0,84.524,76.066,153.418,184.318,156.923c0.873,0.028,1.705,0.304,2.406,0.823
		                            c27.473,20.371,61.311,46.547,108.11,57.536c5.414,1.272,9.687-4.796,7.211-9.774c-3.994-8.033-14.348-32.682-20.463-48.738
		                            C404.856,375.071,408.443,366.877,415.68,363.812z"></path>
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

                        {/* みんなのページここから */}
                        <li className='grid justify-center'>
                            <Link
                                to={'profile/'}
                                className={`
                                group relative flex justify-center rounded px-2 py-1.5  
                                ${nowPage == 'team' ? ('') : ('hover:text-side-gray')}
                                hover:text-side-gray
                                `}
                                onClick={() => setNowPage('profile')}
                            >
                                <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="214px" height="214px" viewBox="0 0 512 512"
                                    className={`row-span-1 w-16 h-16 ${nowPage == 'profile' ? ('fill-white') : ('fill-side-gray hover:fill-white')}`} xmlSpace="preserve">

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
                                    className={`absolute start-full w-28 z-50 top-1/2 text-center -translate-y-1/2 rounded bg-midnight px-2 py-1.5 text-xs font-medium text-white 
                                    ${nowPage == 'profile' ? ('invisible') : ('invisible group-hover:visible')}
                                    
                                    `}
                                >
                                    みんなのプロフィール
                                </span>
                            </Link>
                        </li>
                        {/* みんなのプロフィールここまで */}

                        {/* マイプロフィール設定ここから */}
                        <li className='grid justify-center'>
                            <Link
                                to={'settings/'}
                                className={`
                                group relative flex justify-center rounded px-2 py-1.5  
                                ${nowPage == 'settings' ? ('') : ('hover:text-side-gray')}
                                hover:text-side-gray
                                `}
                                onClick={() => setNowPage('settings')}
                            >
                                <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="214px" height="214px" viewBox="0 0 512 512"
                                    className={`row-span-1 w-16 h-16 ${nowPage == 'settings' ? ('fill-white') : ('fill-side-gray hover:fill-white')}`} xmlSpace="preserve">

                                    <g>
                                        <path className="st0" d="M472.656,203.996l-28.535-1.742c-4.14-14.519-9.894-28.347-17.09-41.277l18.938-21.402
		                                    c14.68-16.586,13.91-41.73-1.75-57.391l-14.402-14.402c-15.661-15.665-40.805-16.43-57.391-1.754l-21.402,18.942
		                                    c-12.93-7.199-26.762-12.95-41.277-17.09l-1.742-28.535C306.652,17.238,288.332,0,266.183,0h-20.366
		                                    c-22.149,0-40.473,17.238-41.821,39.344l-1.742,28.535c-14.519,4.14-28.351,9.89-41.277,17.09l-21.402-18.942
		                                    c-16.586-14.676-41.734-13.91-57.394,1.75L67.778,82.183c-15.661,15.661-16.426,40.805-1.75,57.391l18.942,21.402
		                                    c-7.199,12.93-12.95,26.758-17.09,41.277l-28.535,1.742C17.238,205.344,0,223.668,0,245.817v20.366
		                                    c0,22.149,17.238,40.469,39.344,41.821l28.535,1.742c4.14,14.515,9.89,28.351,17.09,41.277l-18.942,21.402
		                                    c-14.676,16.586-13.91,41.73,1.75,57.391l14.402,14.406c15.66,15.661,40.808,16.426,57.394,1.75l21.402-18.942
		                                    c12.926,7.199,26.758,12.95,41.277,17.09l1.742,28.535C205.344,494.762,223.668,512,245.817,512h20.366
		                                    c22.149,0,40.469-17.238,41.821-39.344l1.742-28.535c14.515-4.14,28.347-9.89,41.277-17.09l21.402,18.942
		                                    c16.586,14.676,41.73,13.906,57.391-1.754l14.402-14.402c15.661-15.661,16.43-40.805,1.75-57.391l-18.938-21.402
		                                    c7.195-12.926,12.95-26.762,17.09-41.277l28.535-1.742C494.762,306.652,512,288.332,512,266.183v-20.366
		                                    C512,223.668,494.762,205.344,472.656,203.996z M311.574,256c0,30.691-24.883,55.574-55.574,55.574
		                                    c-30.695,0-55.574-24.883-55.574-55.574s24.879-55.574,55.574-55.574C286.691,200.426,311.574,225.309,311.574,256z"></path>
                                    </g>
                                </svg>

                                <span
                                    className={`absolute start-full w-28 z-50 top-1/2 text-center -translate-y-1/2 rounded bg-midnight px-2 py-1.5 text-xs font-medium text-white 
                                    ${nowPage == 'settings' ? ('invisible') : ('invisible group-hover:visible')}
                                    
                                    `}
                                >
                                    プロフィール設定
                                </span>
                            </Link>
                        </li>
                        {/* マイプロフィール設定ここまで */}

                        {/* 教師のみ */}
                        {/* 時間割や授業の設定ここから */}

                        <li className='grid justify-center'>
                            <Link
                                to={'classes/'}
                                className={`
                                    group relative flex justify-center rounded px-2 py-1.5  
                                    ${nowPage == 'timetable' ? ('') : ('hover:text-side-gray')}
                                    hover:text-side-gray
                                    `}
                                onClick={() => setNowPage('timetable')}
                            >
                                <svg version="1.1" id="_x32_" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink"
                                    width="214px" height="214px" viewBox="0 0 512 512"
                                    className={`row-span-1 w-16 h-16 ${nowPage == 'timetable' ? ('fill-white') : ('fill-side-gray hover:fill-white')}`} xmlSpace="preserve">

                                    <g>
                                        <path className="st0" d="M164.893,89.791c13.875,0,25.126-11.243,25.126-25.134V25.118C190.019,11.252,178.768,0,164.893,0
		                                            s-25.135,11.252-25.135,25.118v39.538C139.758,78.548,151.018,89.791,164.893,89.791z"></path>
                                        <path className="st0" d="M350.184,89.791c13.867,0,25.126-11.243,25.126-25.134V25.118C375.31,11.252,364.05,0,350.184,0
		                                            c-13.875,0-25.135,11.252-25.135,25.118v39.538C325.048,78.548,336.309,89.791,350.184,89.791z"></path>
                                        <path className="st0" d="M437.25,35.807h-39.865v28.849c0,26.04-21.169,47.218-47.201,47.218c-26.032,0-47.209-21.178-47.209-47.218
		                                            V35.807h-90.881v28.849c0,26.04-21.178,47.218-47.2,47.218c-26.032,0-47.21-21.178-47.21-47.218V35.807H74.75
		                                            c-38.977,0-70.575,31.599-70.575,70.575v335.043C4.175,480.401,35.773,512,74.75,512H437.25c38.976,0,70.575-31.599,70.575-70.575
		                                            V106.382C507.825,67.406,476.226,35.807,437.25,35.807z M473.484,441.425c0,19.978-16.256,36.235-36.235,36.235H74.75
		                                            c-19.979,0-36.235-16.257-36.235-36.235V150.984h434.969V441.425z"></path>
                                        <rect x="174.928" y="382.512" className="st0" width="63.591" height="63.591"></rect>
                                        <rect x="174.928" y="283.96" className="st0" width="63.591" height="63.591"></rect>
                                        <rect x="76.385" y="382.512" className="st0" width="63.582" height="63.591"></rect>
                                        <rect x="76.385" y="283.96" className="st0" width="63.582" height="63.591"></rect>
                                        <rect x="372.032" y="185.417" className="st0" width="63.583" height="63.582"></rect>
                                        <rect x="273.48" y="185.417" className="st0" width="63.591" height="63.582"></rect>
                                        <polygon className="st0" points="350.041,293.216 331.127,278.51 296.686,322.811 276.238,306.454 261.273,325.142 300.677,356.673 	
		                                            "></polygon>
                                        <rect x="372.032" y="283.96" className="st0" width="63.583" height="63.591"></rect>
                                        <rect x="273.48" y="382.512" className="st0" width="63.591" height="63.591"></rect>
                                        <rect x="174.928" y="185.417" className="st0" width="63.591" height="63.582"></rect>
                                    </g>
                                </svg>

                                <span
                                    className={`absolute start-full w-20 z-50 top-1/2 text-center -translate-y-1/2 rounded bg-midnight px-2 py-1.5 text-xs font-medium text-white 
                                        ${nowPage == 'timetable' ? ('invisible') : ('invisible group-hover:visible')}
                                        
                                        `}
                                >
                                    授業
                                </span>
                            </Link>
                        </li>

                    </ul>
                    {/* アイコン群ここまで */}

                </div>
            </div>


            <div className="sticky inset-x-0 bottom-0 border-t  border-gray-100 bg-blue p-2 hover:bg-midnight">
                <div>
                    <button
                        type="submit"
                        onClick={() => setLogout(true)}
                        className="group relative flex w-full text-white justify-center rounded-lg pxtrokeLinejoin-2 py-1.5 text-sm hover:text-white"
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
                </div>
            </div>
        </aside>
    )
}