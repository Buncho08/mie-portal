export default function Message({ data }) {

    return (
        <li className="my-4 max-w-96 min-w-min grid grid-cols-9 grid-rows-fr text-sm">
            <div className="col-span-10 row-span-1 grid grid-cols-10">
                <div className="flex justify-center items-center">
                    <img className="w-full rounded-full" src={`${import.meta.env.VITE_BACKEND_URI}${data.message_user.user_icon}`} alt={`${data.message_user.user_id}のアイコン`} />
                </div>
                <div className="col-span-9 h-full flex px-3 justify-between items-center">
                    <p>
                        {data.message_user.user_last} {data.message_user.user_first}
                    </p>

                </div>
            </div>

            <div className="bg-white mr-4 border col-start-2 col-span-8 row-start-2 row-span-4 self-start border-gray-400 rounded-2xl p-4">

                <p>
                    {data.message}
                </p>

                <div className="w-full h-1 my-2 flex justify-end">
                    <small>
                        {data.message_date}
                    </small>
                </div>
            </div>
        </li>
    )
}

