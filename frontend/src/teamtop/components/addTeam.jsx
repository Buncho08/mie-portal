import ModalBar from "../../public-components/ModalBar"
export default function AddTeam({ hundleAddTeam, setViewFlg, viewFlg }) {
    return (
        <div className="z-50 animate-scale-up-center shadow-lg rounded-lg absolute w-[50%] bg-white h-[30%] m-auto top-0 left-0 right-0 bottom-0">
            <ModalBar closeFlg={setViewFlg} title={`${viewFlg}年生のスレッドを作成`} />
            <div className="w-3/4 m-auto h-[88%] grid mt-8">
                <form onSubmit={hundleAddTeam}>
                    <div className="flex w-full justify-center">
                        <label
                            htmlFor="team_name"
                            className="relative w-[80%] block overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
                        >
                            <input
                                required
                                maxLength={20}
                                type="text"
                                id="team_name"
                                placeholder="チーム名"
                                className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                            />
                            <span
                                className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                            >
                                チームスレッド名
                            </span>
                        </label>
                        <p className="self-end">
                            スレッド
                        </p>
                    </div>
                    <input type="hidden" className="hidden" name="team_grade" value={viewFlg - 1} />
                    <br />
                    <div className="w-full text-right">
                        <button type='submit'
                            className="relative inline-flex items-center justify-center w-40 p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-banner rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-banner group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-banner transition-all duration-300 transform group-hover:translate-x-full ease">
                                作成
                            </span>
                            <span className="relative invisible">作成</span>
                        </button>
                    </div>
                </form>
            </div>
        </div >

    )
}