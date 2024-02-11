import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { UserData } from '../root/root';
import Cookies from 'js-cookie';

export async function LoadUserSettingData() {

    return <></>
}
export default function Settings(params) {
    const userdata = useContext(UserData);
    const usergrade = ['情報システム学科1年', '情報システム学科2年', '教師']
    return (
        <>
            <div className="h-[27%] relative">
                <div className="flex absolute mx-16 top-4">
                    <img src={`http://localhost:8000/api${userdata.user_icon}`} alt="" className='rounded-full' width={150} height={150} />
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
                </div>
                <div className="bg-blue w-full h-[50%]">
                </div>
                <div className="bg-white w-full h-[50%]">

                </div>
            </div>

            <div className="mx-10 mt-4">
                <div className="w-full h-10 bg-blue">
                    これすき！
                </div>
            </div>
        </>
    )
}