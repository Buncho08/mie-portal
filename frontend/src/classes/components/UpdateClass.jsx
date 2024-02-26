import ModalBar from "../../public-components/ModalBar"

export default function UpdateClass({ target, setViewModal, hundleUpdateName, teachers }) {
    return (
        <div className="animate-scale-up-center shadow-lg rounded-lg absolute w-[50%] bg-white h-[37%] m-auto top-0 left-0 right-0 bottom-0 z-40">
            <ModalBar closeFlg={setViewModal} title={'授業を編集する'} />
            <div className="w-3/4 m-auto h-[88%] grid my-8">
                <form onSubmit={hundleUpdateName}>
                    <label
                        htmlFor="class_name"
                        className="relative block overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
                    >
                        <input
                            type="text"
                            id="class_name"
                            name="class_name"
                            placeholder="授業名"
                            defaultValue={target.target_data.class_name}
                            className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                        />

                        <span
                            className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                        >
                            授業名
                        </span>
                    </label>
                    <div className="relative w-[60%] mt-5">
                        <select className="peer p-4 pe-9 block w-full border-gray-300 border rounded-lg outline-0 text-sm focus:border-banner focus:ring-banner disabled:opacity-50 disabled:pointer-events-none 
                            focus:pt-6
                            focus:pb-2
                            [&:not(:placeholder-shown)]:pt-6
                            [&:not(:placeholder-shown)]:pb-2
                            autofill:pt-6
                            autofill:pb-2"
                            name='user_id'
                            id='user_id'
                            defaultValue={target.target_data.class_teacher.user_id}
                        >
                            {teachers.map((data, index) => (
                                <option value={data.user_id} key={data.user_id}>
                                    {data.user_last} {data.user_first}
                                </option>
                            ))}
                        </select>
                        <label className="absolute top-0 start-0 p-4 h-full truncate pointer-events-none transition ease-in-out duration-100 border border-transparent dark:text-white peer-disabled:opacity-50 peer-disabled:pointer-events-none
                        peer-focus:text-xs
                        peer-focus:-translate-y-1.5
                     peer-focus:text-gray-500
                        peer-[:not(:placeholder-shown)]:text-xs
                        peer-[:not(:placeholder-shown)]:-translate-y-1.5
                        peer-[:not(:placeholder-shown)]:text-gray-500">
                            担当教師
                        </label>
                    </div>
                    <br />
                    <div className="w-full text-right">
                        <button type='submit'
                            className="relative inline-flex items-center justify-center w-40 p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-banner rounded-full shadow-md group">
                            <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-banner group-hover:translate-x-0 ease">
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                            </span>
                            <span className="absolute flex items-center justify-center w-full h-full text-banner transition-all duration-300 transform group-hover:translate-x-full ease">
                                編集
                            </span>
                            <span className="relative invisible">編集</span>
                        </button>
                    </div>
                </form>
            </div>
        </div >
    )
}