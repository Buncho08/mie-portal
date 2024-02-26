import { useState } from "react"
import Cookies from 'js-cookie';
import Confirmation from "../../public-components/Confirmation";
export default function MyMessage({ data, chatData, setChatData }) {
    const [viewModal, setViewModal] = useState(false);
    const [target, setTarget] = useState({
        'target': '',
        'target_data': {},
    });

    const hundleDeleteMessage = async (e) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/team/chat/${target.target_data.message_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                if (res.status == 200) {
                    return res.json()
                }
                else {
                    return false
                }
            })
            .then((data) => data)
            .catch((err) => console.log(err))

        if (status) {
            setChatData(chatData.filter((data) => data.message_id !== target.target_data.message_id));
            setViewModal(false);
            setTarget({
                'target': '',
                'target_data': {}
            })
        }
    }
    return (
        <li className="my-4 max-w-96 min-w-min ms-auto grid grid-cols-10 grid-rows-fr text-sm">
            {
                // 削除確認
                viewModal
                && (
                    <div className="h-[100%] sticky">
                        <Confirmation target={target} dofunc={hundleDeleteMessage} setFlg={setViewModal} />
                    </div>
                )
            }
            <div className="col-span-10 row-span-1 grid grid-cols-10 ">
                <div className="col-span-9 h-full flex px-3 justify-between ms-auto items-center">
                    <p>
                        {data.message_user.user_last} {data.message_user.user_first}
                    </p>
                </div>
                <div className="flex justify-center items-center">
                    <img className="w-full rounded-full" src={`http://localhost:8000/api${data.message_user.user_icon}`} alt={`${data.message_user.user_id}のアイコン`} />
                </div>
            </div>

            <div className="bg-white border ml-4 col-start-1 col-span-9 row-start-2 row-span-4 self-start border-gray-400 rounded-2xl p-4">

                <p className="">
                    {data.message}
                </p>
                <div className="w-full h-5 flex justify-end mt-3">
                    <small>
                        {data.message_date}
                    </small>
                    <button onClick={(e) => {
                        setTarget({
                            'target': data.message,
                            'target_data': data
                        });
                        setViewModal(true);
                    }}>
                        🗑️
                    </button>
                </div>
            </div>
        </li>
    )
}
