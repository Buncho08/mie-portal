import { useEffect, useState, Fragment } from "react"
import ModalBar from "../../public-components/ModalBar";
import SubTitleBar from "../../public-components/SubTitleBar";

export default function UserModal({ userdata, setViewUser }) {
    const usergrade = ['情報システム学科1年生', '情報システム学科2年生', '教師'];
    const [showLikeCategory, setShowLikeCategory] = useState([]);
    const fetchLikeCategory = async () => {
        const data = await fetch(`http://localhost:8000/api/settings/like/set?user=${userdata.user_id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        return data
    }


    useEffect(() => {
        let ignore = false;
        fetchLikeCategory().then(res => {
            if (!ignore) {
                setShowLikeCategory(res);
            }
        })

        return () => {
            ignore = true
        }
    }, [])
    return (
        <div className="absolute w-[60%] bg-white h-[80%] m-auto top-0 left-0 right-0 bottom-0">
            <ModalBar closeFlg={setViewUser} flg={{}} title={`${userdata.user_last} ${userdata.user_first} さんのプロフィール`} />
            <div className="h-[27%] relative">
                <div className="flex absolute mx-16 top-4">
                    <img src={`http://localhost:8000/api${userdata.user_icon}`} alt="" className='rounded-full' width={150} height={150} />
                    <div className="grid items-end mx-5 mb-2">
                        <div>
                            <p>
                                {usergrade[userdata.user_grade]}
                            </p>
                            <p className="text-2xl mt-1">
                                {userdata.user_last} {userdata.user_first}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-center bg-[url('/class_bg.webp')] w-full h-[50%]">
                </div>
                <div className="bg-white w-full h-[50%]">

                </div>
            </div>

            <div className="mx-10 mt-4">
                <SubTitleBar title={'これすき！'} />
                < div className="grid grid-cols-6 gap-3  overflow-y-scroll">
                    {
                        showLikeCategory.length > 0
                            ? (<>
                                {showLikeCategory.map((data, index) => (
                                    <Fragment key={index}>
                                        {
                                            <div className="grid justify-center items-center">
                                                <img
                                                    src={`http://localhost:8000/api${data.conf_like.like_icon}`}
                                                    alt=""
                                                    width={100} height={100} />
                                            </div>

                                        }
                                    </Fragment>
                                ))}
                            </>)
                            : (
                                <div className="mx-side w-full">
                                    <p>
                                        設定されていません
                                    </p>
                                </div>
                            )
                    }

                </div>
            </div>
        </div >
    )
}