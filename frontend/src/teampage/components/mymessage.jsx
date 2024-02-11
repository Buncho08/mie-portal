export default function MyMessage({ data, hundleDeleteMessage }) {

    return (
        <li className="max-w-96 min-w-min ms-auto grid grid-cols-10 grid-rows-fr text-sm">
            <div className="col-span-10 row-span-1 grid grid-cols-10">
                <div className="col-span-9 h-full flex px-3 justify-between ms-auto items-center">
                    <p>
                        {data.message_user.user_last} {data.message_user.user_first}
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <img className="w-full rounded-full" src={`http://localhost:8000/api${data.message_user.user_icon}`} alt={`${data.message_user.user_id}のアイコン`} />
                </div>
            </div>

            <div className="bg-white border col-start-1 col-span-9 row-start-2 row-span-4 self-start border-gray-200 rounded-2xl p-4">

                <p>
                    {data.message}
                </p>
                <div className="w-full h-5 flex justify-end mt-3">
                    <small>
                        {data.message_date}
                    </small>
                    <button onClick={(e) => hundleDeleteMessage(e, data.message_id)}>
                        🗑️
                    </button>
                </div>
            </div>
        </li>
    )
}
