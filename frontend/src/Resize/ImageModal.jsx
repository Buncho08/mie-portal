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
                        <button onClick={(e) => hundleClick(e)}
                            className="relative inline-flex items-center justify-center w-44 h-[80%] p-2 px-6 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-[0.5px] border-banner rounded-xl mx-4 shadow-lg group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-br from-sky-500 via-banner to-sky-500 group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-banner transition-all duration-300 transform group-hover:translate-x-full ease">
                                トリミング
                            </span>
                            <span className="relative invisible">トリミング</span>
                        </button>
                        {/* <button

                            className="bg-blue h-10">
                            トリミングする
                        </button> */}
                    </div>
                </div>
            </div >
        </div>
    )
}