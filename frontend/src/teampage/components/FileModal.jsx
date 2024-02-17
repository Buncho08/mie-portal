import ModalBar from "../../public-components/ModalBar"

export default function FileModal({ hundleUploadFile, setViewFlg, filename, setFilename }) {
    return (
        <div className="absolute w-[40%] bg-white h-[30%] m-auto top-0 left-0 right-0 bottom-0">
            <ModalBar closeFlg={setViewFlg} title={`ファイルをアップロード`} />
            <div className="w-3/4 m-auto h-[88%] grid mt-8">
                <form onSubmit={hundleUploadFile}>
                    <div className="flex">
                        <label
                            htmlFor="file_name"
                            className="relative block w-[50%] overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
                        >
                            <input
                                type="text"
                                id="file_name"
                                name="file_name"
                                placeholder="URL"
                                defaultValue={filename ? (filename.split('.').slice(0, -1)) : ('')}
                                className="peer h-8 w-[50%] border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                            <span
                                className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                            >
                                ファイル名
                            </span>
                        </label>
                        <input type="text" name="file_name_ex" id="file_name_ex" className="self-end outline-0" readOnly defaultValue={filename ? (`.${filename.split('.')[filename.split('.').length - 1]}`) : ('')} />
                    </div>
                    <br />
                    <input type="file" name="file_obj" id="file_obj" onInput={(e) => { setFilename(e.target.files[0].name) }} />
                    <div className="w-full text-right">
                        <button
                            type="submit"
                            className="group mx-side relative rounded-lg w-[8rem] text-sm font-medium focus:outline-none focus:ring hover:text-white"
                        >
                            <span className="absolute inset-0 rounded-lg border border-gray-600 group-hover:bg-banner group-hover:text-white group-hover:border-white"></span>
                            <span
                                className="block border border-gray-600 border-current rounded-lg bg-white px-12 py-3 transition-transform group-hover:border-white group-hover:-translate-x-1 group-hover:bg-banner group-hover:-translate-y-1"
                            >
                                共有
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}