import ModalBar from "../../public-components/ModalBar"
import { useState } from "react"

export default function LinkModal({ hundleSubmit, setViewFlg }) {
    const [link, setLink] = useState('');
    const getTitle = async () => {
        return 0
    }
    return (
        <div className="animate-scale-up-center shadow-lg rounded-lg absolute w-[40%] bg-white h-[44%] m-auto top-0 left-0 right-0 bottom-0">
            <ModalBar closeFlg={setViewFlg} title={`リンクを共有`} />
            <div className="mx-side-side text-center mt-4">
                <small>
                    🔗リンクの名前を設定できます🔗
                    <br />
                    空欄の場合、自動でURLがタイトルになります
                </small>
            </div>
            <div className="w-3/4 m-auto h-[88%] grid mt-8">
                <form onSubmit={hundleSubmit}>
                    <label
                        htmlFor="link_title"
                        className="relative block overflow-hidden border-b border-gray-600 pt-2 bg-transparent focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="link_title"
                            name="link_title"
                            placeholder="リンク名"
                            defaultValue={link}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                        >
                            リンク名
                        </span>
                    </label>
                    <br />
                    <label
                        htmlFor="link_URL"
                        className="relative block overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="link_URL"
                            placeholder="URL"
                            onChange={(e) => setLink(e.target.value)}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                        >
                            URL
                        </span>
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
                                共有
                            </span>
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}