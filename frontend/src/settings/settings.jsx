import { useContext, useState, Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import { UserData } from '../root/root';
import LikeCategory from "./components/likecategory";
import UserDataEdit from "./components/UserDataEdit";
import TitleBar from "../public-components/TitleBar";
import SubTitleBar from "../public-components/SubTitleBar";
import SectionTitleBar from '../public-components/SectionTitleBar'

export async function LoadUserSettingData() {
    const likecategory = await fetch(`http://localhost:8000/api/settings/like`, {
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
                className="
            h-24 bg-[url('/class_bg.webp')] bg-center flex justify-around px-side-side
            ">
                <TitleBar title={'マイプロフィール'} />

            </header>
            <div className="h-[27%] relative">
                <div className="flex absolute mx-16 top-4 w-4/5 px-side-side">
                    <div onClick={() => setViewEdit(true)}>
                        <img src={`http://localhost:8000/api${userdata.user_icon}`} alt="" className='rounded-full shadow-xl' width={150} height={150} />
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
                <div className="bg-[url('/class_bg.webp')] bg-center w-full h-[50%]">
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

