import ModalBar from "../../public-components/ModalBar"
import { useState, useRef } from "react"
import ImageModal from "../../Resize/ImageModal";
import Cropper from 'cropperjs';

export default function AddLikeCategory({ setShowAddLikeModal, likecategory, hundleCreateCategory }) {
    const [likeIcon, setLikeIcon] = useState('');
    const [viewFlg, setViewFlg] = useState(false);
    const imgRef = useRef(null);
    const fileRef = useRef(null);
    const [cropper, setCropper] = useState();
    const [prev, setPrev] = useState('');

    const hundleClick = (e) => {
        e.preventDefault();
        let canvas = cropper.getCroppedCanvas();
        canvas.toBlob(function (imgBlob) {
            const croppedImgFile = new File([imgBlob], 'aft.png', { type: "image/png" });
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
        <div className="animate-scale-up-center shadow-lg rounded-lg absolute w-[50%] bg-white h-[35%] m-auto top-0 left-0 right-0 bottom-0">
            <ModalBar closeFlg={setShowAddLikeModal} title={'これすきカテゴリの追加'} />
            <div className="w-3/4 m-auto h-[88%] grid grid-cols-3 mt-8">
                <div className="col-span-1">
                    <img src={prev} alt="" width={150} height={150} className="bg-slate-400 rounded-full" />
                </div>
                <form onSubmit={hundleCreateCategory} className="col-span-2">
                    <p>
                        追加先 : {likecategory} カテゴリ
                    </p>
                    <label
                        htmlFor="like_name"
                        className="relative block overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            required
                            type="text"
                            id="like_name"
                            placeholder="カテゴリ名"
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                        >
                            カテゴリ名
                        </span>
                    </label>
                    <br />
                    <label htmlFor="like_icon">
                        <input type="file" name="like_icon" id="like_icon" accept=".jpg, .jpeg, .png, .gif"
                            ref={fileRef}
                            onChange={(e) => changeImg(e)}
                        />
                    </label>
                    <br />
                    <div className="w-full text-right">
                        <button
                            type="submit"
                            className="group mx-side relative rounded-lg w-[8rem] text-sm font-medium focus:outline-none focus:ring hover:text-white"
                        >
                            <span className="absolute inset-0 rounded-lg border border-gray-600 group-hover:bg-banner group-hover:text-white group-hover:border-white"></span>
                            <span
                                className="block border border-gray-600 border-current rounded-lg bg-white px-12 py-3 transition-transform group-hover:border-white group-hover:-translate-x-1 group-hover:bg-banner group-hover:-translate-y-1"
                            >
                                作成
                            </span>
                        </button>
                    </div>
                </form>
            </div>
            <ImageModal setViewFlg={setViewFlg} viewFlg={viewFlg} userIcon={likeIcon} imgRef={imgRef} hundleClick={hundleClick} />

        </div >
    )
}