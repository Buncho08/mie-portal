
export default function CreateClasses({ teachers, hundleSubmit }) {

    return (

        <form onSubmit={hundleSubmit} className='px-side-side my-5'>
            <label
                htmlFor="class_name"
                className="relative w-96 block overflow-hidden border-b border-gray-600 bg-transparent pt-3 focus-within:border-blue-600"
            >
                <input
                    type="text"
                    id="class_name"
                    name='class_name'
                    placeholder="授業名"
                    required
                    className="peer h-8 w-full border-none bg-transparent p-0 placeholder-transparent focus:border-transparent focus:outline-none focus:ring-0 sm:text-sm"
                />

                <span
                    className="absolute start-0 top-2 -translate-y-1/2 text-xs text-gray-700 transition-all peer-placeholder-shown:top-1/2 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-xs"
                >
                    授業名
                </span>
            </label>
            <div className="grid sm:grid-cols-2 gap-2 w-[60%] mt-5">

                <label htmlFor="first" className="flex p-3 w-full bg-white border border-gray-200 rounded-lg text-sm focus:border-banner focus:ring-banner">
                    <input
                        type="radio" name="class_grade" value={0}
                        className="shrink-0 mt-0.5 border-gray-200 rounded-full text-banner focus:ring-banner disabled:opacity-50 disabled:pointer-events-none" id="first" />
                    <span className="text-sm text-black ms-3">1年生</span>
                </label>

                <label htmlFor="second" className="flex p-3 w-full bg-white border text-banner border-gray-200 rounded-lg text-sm focus:border-banner focus:ring-banner">
                    <input
                        type="radio" name="class_grade" value={1}
                        className="shrink-0 mt-0.5 border-gray-200 rounded-full t focus:ring-banner disabled:opacity-50 disabled:pointer-events-none" id="second" />
                    <span className="text-sm text-black ms-3 ">2年生</span>
                </label>
            </div>
            <br />

            <div className="relative w-[60%]">
                <select className="peer p-4 pe-9 block w-full border-gray-300 border rounded-lg outline-0 text-sm focus:border-banner focus:ring-banner disabled:opacity-50 disabled:pointer-events-none 
                    focus:pt-6
                    focus:pb-2
                    [&:not(:placeholder-shown)]:pt-6
                    [&:not(:placeholder-shown)]:pb-2
                    autofill:pt-6
                    autofill:pb-2"
                    name='user_id'
                    id='user_id'
                    defaultValue={teachers[0].user_id}
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
            <div className="w-[70%] mt-4 text-right">
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

    )
}