import Cookies from 'js-cookie';
import { useState, useRef } from 'react';
import ModalBar from '../../public-components/ModalBar';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCameraRetro } from '@fortawesome/free-solid-svg-icons';
import ImageModal from '../../Resize/ImageModal';
import Cropper from 'cropperjs';

export default function UserDataEdit({ setViewEdit, userdata }) {
    const [iconCover, setIconCover] = useState(false);
    const [userIcon, setUserIcon] = useState(`${import.meta.env.VITE_BACKEND_URI}${userdata.user_icon}`);
    const [cropper, setCropper] = useState();
    const [viewFlg, setViewFlg] = useState();
    const [prev, setPrev] = useState(`${import.meta.env.VITE_BACKEND_URI}${userdata.user_icon}`);
    const imgRef = useRef(null);
    const fileRef = useRef(null);

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
        const status = await fetch('${import.meta.env.VITE_BACKEND_URI}/myaccount/update', {
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
        console.log(status);
        location.reload();
    }

    const hundleClick = (e) => {
        e.preventDefault();
        let canvas = cropper.getCroppedCanvas();
        canvas.toBlob(function (imgBlob) {
            const croppedImgFile = new File([imgBlob], '切り抜き画像.png', { type: "image/png" });
            const dt = new DataTransfer();
            dt.items.add(croppedImgFile);
            fileRef.current.files = dt.files;
        });
        let data = canvas.toDataURL();
        setPrev(data);
        setViewFlg(false);
    }

    const changeImg = (e) => {
        e.preventDefault();
        if (!e.target.files) {
            return <></>;
        }
        const fileobj = e.target.files[0];
        console.log(imgRef.current);
        setViewFlg(true);
        imgRef.current.src = window.URL.createObjectURL(fileobj);
        setCropper(new Cropper(imgRef.current, { aspectRatio: 1 / 1 }));
        return e.target.files[0];
    }



    return (
        <form onSubmit={hundleUpdateUser} className="z-30 animate-scale-up-center shadow-lg rounded-lg absolute w-[60%] bg-white h-[43%] m-auto top-0 left-0 right-0 bottom-0">
            <ModalBar closeFlg={setViewEdit} flg={false} title={`プロフィールの編集`} />

            <div className="h-[27%] relative">
                <div className='w-[80%] mx-auto'>
                    <div className="flex absolute mx-16 top-4">
                        <label className='relative block' htmlFor='user_icon'
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
                            <input type="file" name="user_icon" id="user_icon" className='hidden' accept='.jpg,.jpeg,.png,.gif'
                                ref={fileRef}
                                onChange={(e) => changeImg(e)}
                            />
                            <img src={prev} alt="" width={150} height={150} className="bg-slate-400 rounded-full shadow-lg" />
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
                <button type='submit'
                    className="relative inline-flex items-center justify-center w-40 p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-banner rounded-full shadow-md group">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-banner group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-banner transition-all duration-300 transform group-hover:translate-x-full ease">
                        更新
                    </span>
                    <span className="relative invisible">更新</span>
                </button>
            </div>

            <ImageModal setViewFlg={setViewFlg} viewFlg={viewFlg} userIcon={userIcon} imgRef={imgRef} hundleClick={hundleClick} />

        </form >
    )
}

{/* <input type="file" name="user_icon" id="user_icon" />
<button type="submit">
    変更
</button> */}