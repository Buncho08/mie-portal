import { useState, useRef, useCallback } from "react";
import ImageModal from "./ImageModal";
import Cropper from 'cropperjs';
export const ASPECT_RATIO = 1 / 1;
export const CROP_WIDTH = 150;


export default function Resize() {
    const [viewFlg, setViewFlg] = useState(false);
    const [userIcon, setUserIcon] = useState('');
    const [prev, setPrev] = useState('');
    const imgRef = useRef(null);
    const btnRef = useRef(null);
    const [cropper, setCropper] = useState();

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

    const hundleClick = (e) => {
        console.log('click');
        let canvas = cropper.getCroppedCanvas();
        let data = canvas.toDataURL();
        setPrev(data);
    }

    return (
        <div className="h-screen bg-gray-300">
            <input type="file" name="user_icon" id="user_icon" className='' accept='.jpg,.jpeg,.png,.gif'
                onChange={(e) => {
                    changeImg(e);
                }}
            />

            <ImageModal setViewFlg={setViewFlg} viewFlg={viewFlg} userIcon={userIcon} imgRef={imgRef} hundleClick={hundleClick} />
            {
                prev && (
                    <img src={prev} />
                )
            }
        </div>
    )
}