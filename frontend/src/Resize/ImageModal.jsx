import ModalBar from "../public-components/ModalBar"
import 'cropperjs/dist/cropper.css';
export default function ImageModal({ setViewFlg, viewFlg, imgRef, hundleClick }) {

    return (
        <div className={`${viewFlg ? ('') : ('hidden')} bg-cover-gray absolute h-full w-full top-0 left-0 z-10`}>
            <div className={`
             z-50 animate-scale-up-center shadow-lg rounded-lg absolute w-[40%] bg-white h-[400px] m-auto top-0 left-0 right-0 bottom-0`}>
                <ModalBar closeFlg={setViewFlg} title={`ファイルをアップロード`} />
                <div className="grid justify-center items-center">
                    <div className=" h-[300px] w-[300px]">
                        <img src="" ref={imgRef} />
                    </div>
                    <div className="grid justify-center items-center">
                        <button
                            onClick={(e) => hundleClick(e)}
                            className="bg-blue h-10">
                            トリミングする
                        </button>
                    </div>
                </div>
            </div >
        </div>
    )
}