import ModalBar from "../../public-components/ModalBar"
export default function AddTeam({ hundleAddTeam, setViewFlg, viewFlg }) {
    return (
        <div className="animate-scale-up-center shadow-lg rounded-lg absolute w-[50%] bg-white h-[30%] m-auto top-0 left-0 right-0 bottom-0">
            <ModalBar closeFlg={setViewFlg} title={`${viewFlg}年生のスレッドを作成`} />
            <div className="w-3/4 m-auto h-[88%] grid mt-8">
                <form onSubmit={hundleAddTeam}>
                    <label
                        htmlFor="team_name"
                        className="relative block overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
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
                    <input type="hidden" className="hidden" name="team_grade" value={viewFlg - 1} />
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
        </div >

    )
}