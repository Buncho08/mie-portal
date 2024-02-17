import Cookies from 'js-cookie';
import { useState } from 'react';
import ModalBar from '../../public-components/ModalBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons'

export default function UserDataEdit({ setViewEdit, userdata }) {
    const [iconCover, setIconCover] = useState(false);
    const [userIcon, setUserIcon] = useState(`http://localhost:8000/api${userdata.user_icon}`)
    const hundleUpdateUser = async (e) => {
        console.log('unko')
        e.preventDefault();
        const sendData = new FormData();
        console.log(e.target.user_icon.files)
        if (e.target.user_icon.files[0]) {
            sendData.append('user_icon', e.target.user_icon.files[0]);
        }
        sendData.append('user_last', e.target.user_last.value);
        sendData.append('user_first', e.target.user_first.value);
        const status = await fetch('http://localhost:8000/api/myaccount/update', {
            method: 'PATCH',
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

        location.reload();
    }
    return (
        <form onSubmit={hundleUpdateUser} className="absolute w-[60%] bg-white h-[40%] m-auto top-0 left-0 right-0 bottom-0">

            <ModalBar closeFlg={setViewEdit} flg={false} title={`プロフィールの編集`} />

            <div className="h-[27%] relative">
                <div >
                    <div className="flex absolute mx-16 top-4 z-40">
                        <label className='relative block z-40' htmlFor='user_icon'
                            onMouseOver={() => setIconCover(true)}
                            onMouseLeave={() => setIconCover(false)}
                        >
                            <button
                                className={`bg-white flex justify-center items-center w-20 h-20 rounded-full opacity-0 absolute z-10
                                    top-0 bottom-0 left-0 right-0 m-auto ${iconCover && ('opacity-90')}
                                    `}
                                onClick={(e) => {
                                    e.preventDefault();
                                    const file = document.getElementById('user_icon');
                                    file.click();
                                }}
                            >
                                <FontAwesomeIcon icon={faCameraRetro} size='3x' />
                            </button>
                            <div className={`bg-black cursor-pointer h-full w-full absolute rounded-full opacity-0 ${iconCover && ('opacity-50')}`}>
                            </div>
                            <input type="file" name="user_icon" id="user_icon" className='hidden'
                                onChange={(e) => {
                                    e.preventDefault();
                                    if (!e.target.files) {
                                        return <></>;
                                    }
                                    const fileobj = e.target.files[0];
                                    setUserIcon(window.URL.createObjectURL(fileobj));
                                    return e.target.files[0];
                                }}
                            />
                            <img src={userIcon} alt="" width={150} height={150} className="bg-slate-400 rounded-full" />
                        </label>
                        <div className="grid items-end mx-5 mb-2">
                            <div>
                                <div className='flex'>
                                    <label
                                        htmlFor="user_last"
                                        className="relative block w-40 mx-side my-2 overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            type="text"
                                            name='user_last'
                                            id="user_last"
                                            placeholder="苗字"
                                            defaultValue={userdata.user_last}
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span
                                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                                        >
                                            苗字
                                        </span>
                                    </label>
                                    <label
                                        htmlFor="user_first"
                                        className="relative block w-40 mx-side my-2 overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
                                    >
                                        <input
                                            type="text"
                                            name='user_first'
                                            id="user_first"
                                            placeholder="名前"
                                            defaultValue={userdata.user_first}
                                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                                        />
                                        <span
                                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                                        >
                                            名前
                                        </span>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="bg-center bg-[url('/class_bg.webp')] w-full h-[80%]">
                </div>
                <div className="bg-white w-full h-[10%]">
                </div>
            </div >
            <div className="flex justify-end mt-28 mr-auto pr-28">
                <button type='submit' className='h-10 w-20 rounded-lg bg-cyan-200'>
                    更新
                </button>
            </div>

        </form >
    )
}

{/* <input type="file" name="user_icon" id="user_icon" />
<button type="submit">
    変更
</button> */}