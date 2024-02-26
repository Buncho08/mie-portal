import { useContext, useState, Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import { UserData } from '../root/root';
import LikeCategory from "./components/likecategory";
import UserDataEdit from "./components/UserDataEdit";
import TitleBar from "../public-components/TitleBar";
import SubTitleBar from "../public-components/SubTitleBar";
import bgimg from '/class_bg.webp';

export async function LoadUserSettingData() {
    const likecategory = await fetch(`${import.meta.env.VITE_BACKEND_URI}/settings/like`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    return { likecategory }
}

export default function Settings() {
    const userdata = useContext(UserData);
    const { likecategory } = useLoaderData();
    const usergrade = ['情報システム学科1年', '情報システム学科2年', '教師']
    const [viewEdit, setViewEdit] = useState(false);
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ]
    const rd = Math.floor(Math.random() * 4);

    return (
        <div className={`h-screen`}>
            {
                viewEdit && (
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0 z-20">
                        <UserDataEdit setViewEdit={setViewEdit} userdata={userdata} />
                    </div>
                )
            }
            <header
                className={`
                h-[12%] bg-[url('${bgimg}')] bg-center flex justify-around px-side-side
                `}>
                <TitleBar title={'マイプロフィール'} />

            </header>
            <div className="h-[27%] relative">
                <div className="flex absolute mx-16 top-4 w-4/5 px-side-side">
                    <div onClick={() => setViewEdit(true)}>
                        <img src={`${import.meta.env.VITE_BACKEND_URI}${userdata.user_icon}`} alt="" className='rounded-full shadow-xl' width={150} height={150} />
                    </div>
                    <div className="grid items-end mx-5">
                        <div>
                            <p>
                                {usergrade[userdata.user_grade]}
                            </p>
                            <p className="text-2xl">
                                {userdata.user_last} {userdata.user_first}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto mr-10 self-end">
                        <button onClick={() => setViewEdit(true)}
                            className="relative w-40 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-gradient-to-br from-gray-100 via-gray-200 to-gray-200 rounded-xl group">
                            <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-100 ease-in-out bg-gradient-to-br from-sky-500 via-banner to-sky-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                                <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                            </span>
                            <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-400 ease-in-out delay-200 -translate-x-full translate-y-full bg-gradient-to-br from-sky-500 via-banner to-sky-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                            <span className="relative w-full text-gray-900 text-center transition-colors duration-200 ease-in-out group-hover:text-white">
                                編集する
                            </span>
                        </button>

                    </div>
                </div>
                <div className={`bg-[url('${bgimg}')] bg-center w-full h-[50%]`}>
                </div>
                <div className="bg-white w-full h-[50%]">

                </div>
            </div>

            <div className="mx-10">
                <SubTitleBar title={'すきなものを設定してみましょう'} />
                <LikeCategory likecategory={likecategory} userdata={userdata} />
            </div >
        </div>
    )
}

