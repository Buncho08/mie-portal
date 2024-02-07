import { useLoaderData } from "react-router-dom";
import { Fragment, useContext, useState } from "react";
import { UserData } from '../root/root';
import Cookies from 'js-cookie';
import Message from "./components/message";
import MyMessage from "./components/mymessage";
export async function LoadTeamPageData({ params }) {
    const teamdata = await fetch(`http://localhost:8000/api/team/chat/${params.team_id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { teamdata }
}

export default function TeamPage() {
    const { teamdata } = useLoaderData();
    const userdata = useContext(UserData);

    const [chatData, setChatData] = useState(teamdata)
    const hundleDeleteMessage = async (e, message_id) => {
        const status = await fetch(`http://localhost:8000/api/team/chat/${message_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        if (status) {
            setChatData(chatData.filter((data) => data.message_id !== message_id))
        }
    }

    return (
        <div className="max-w-4xl">
            <ul className="grid gap-y-1">
                {
                    chatData.map((data) => (
                        <Fragment key={data.message_id}>
                            {
                                data.message_user.user_id === userdata.user_id
                                    ? <MyMessage data={data} hundleDeleteMessage={hundleDeleteMessage} />
                                    : <Message data={data} />
                            }
                        </Fragment>
                    ))
                }
            </ul>
        </div>
    )
}

// {
//     teamdata.length > 0
//         ? (
//             teamdata.map((data) => (
//                 <div key={data.message_id}>
//                     {data.message}
//                 </div>
//             ))
//         )
//         : (
//             <p>
//                 チャット履歴がありません
//             </p>
//         )
// }