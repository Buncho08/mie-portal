import { useContext, useState, Fragment } from "react";
import { useLoaderData } from "react-router-dom";
import { UserData } from '../root/root';
import Cookies from 'js-cookie';
import LikeCategory from "./components/likecategory";
import UserDataEdit from "./components/UserDataEdit";


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
    const category = ['ゲーム', '趣味', 'プログラミング', 'いきもの']
    const [showCategory, setShowCategory] = useState(0);
    const [showLikeCategory, setShowLikeCategory] = useState(likecategory);
    const [viewEdit, setViewEdit] = useState(false);

    const hundleSetLike = async (e, like_id) => {
        const sendData = new FormData();
        sendData.append('like_id', like_id);
        sendData.append('user_id', userdata.user_id);
        const status = await fetch(`http://localhost:8000/api/settings/like/set`, {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",

        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        setShowLikeCategory(showLikeCategory.map((data) => {
            if (data.like_id === like_id) {
                data.conf_like = status;
            }

            return data;
        }));
        return 0;
    }

    const hundleDeleteLike = async (e, conf_id) => {
        const status = await fetch(`http://localhost:8000/api/settings/like/delete/${conf_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",

        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        setShowLikeCategory(showLikeCategory.map((data) => {
            if (data.conf_like && data.conf_like.conf_id === conf_id) {
                data.conf_like = null;
            }
            return data;
        }));
    }


    return (
        <div className={`h-screen ${viewEdit && 'relative'}`}>
            {
                viewEdit && (
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0 z-20">
                        <UserDataEdit setViewEdit={setViewEdit} userdata={userdata} />
                    </div>
                )
            }
            <div className="w-full h-14 bg-blue p-2 flex items-center">
                <h2 className="text-2xl">
                    マイプロフィール
                </h2>
            </div>
            <div className="h-[27%] relative">
                <div className="flex absolute mx-16 top-4 w-4/5">
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
                    <div className="ml-auto mr-10 self-end">
                        <button className="bg-side-gray w-40 h-10 rounded-lg" onClick={() => setViewEdit(true)}>
                            編集
                        </button>
                    </div>
                </div>
                <div className="bg-blue w-full h-[50%]">
                </div>
                <div className="bg-white w-full h-[50%]">

                </div>
            </div>

            <div className="mx-10">
                <div className="w-full h-10 bg-blue p-2">
                    <p>これすき！なものを設定してみましょう</p>
                </div>
                <div className="flex justify-around items-center">
                    {category.map((data, index) => (
                        <button
                            className={`
                            border-midnight border-solid border-2 rounded-lg h-10 w-48 my-2  
                            ${showCategory == index ? ('bg-bermuda') : ('bg-white hover:bg-metal hover:text-white')}
                            `}
                            key={index * 10}
                            onClick={() => setShowCategory(index)}
                        >
                            {data}
                        </button>
                    ))}
                </div>

                {category.map((data, index) => (
                    <Fragment key={index * 100}>
                        <div key={index * 100} className={`${showCategory == index ? ('') : ('hidden')}`}>
                            <div className={`w-full h-10 bg-blue p-2 my-2`}>
                                <p>{data}</p>
                            </div>
                            <LikeCategory showLikeCategory={showLikeCategory} category={index} hundleSetLike={hundleSetLike} hundleDeleteLike={hundleDeleteLike} />
                        </div>
                    </Fragment>
                ))}
            </div >
        </div>
    )
}

