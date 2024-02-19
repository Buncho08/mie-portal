import { Fragment, useContext, useState, useRef, useEffect } from "react";
import { UserData } from '../../root/root';
import Cookies from 'js-cookie';
import Message from "./message";
import MyMessage from "./mymessage";
import ChatForm from "./chatForm";

// チャットだけ再レンダリング、再取得できるようにしたい

export default function Chat({ teammessage, team_id }) {
    const userdata = useContext(UserData);
    const [chatData, setChatData] = useState(teammessage)
    const focusRef = useRef(null);

    const hundleDeleteMessage = async (e, message_id) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/team/chat/${message_id}`, {
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
            setChatData(chatData.filter((data) => data.message_id !== message_id))
        }
    }

    const focusLastElm = () => {
        focusRef.current.children[focusRef.current.children.length - 1].scrollIntoView(true);
        console.log(focusRef.current.children[focusRef.current.children.length - 1]);
        return true;
    }

    const hundleSendMessage = async (e) => {
        e.preventDefault();
        if (e.target.message.value == '') {
            return <></>
        }
        const sendData = new FormData();
        sendData.append('message', e.target.message.value);
        sendData.append('user_id', userdata.user_id)
        sendData.append('team_id', team_id)
        e.target.reset();
        const status = await fetch(`http://localhost:8000/api/team/chat/${team_id}`, {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                if (res.status == 201) {
                    return res.json()
                }
                else {
                    return false
                }
            })
            .then((data) => data)
            .catch((err) => console.log(err))

        if (!status) {
            return <></>
        }
        setChatData([...chatData, status]);
    }


    const getNewMessage = async (e) => {
        e.preventDefault();
        const message = await fetch(`http://localhost:8000/api/team/chat/${team_id}`, {
            method: 'GET',
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        setChatData(message.team_message);
    }

    // チャットが更新されたら(chatDataという状態が更新されたら)
    // 最期の要素にフォーカスする。無限ループが起こらないかとても心配
    useEffect(() => {
        focusRef.current.children[focusRef.current.children.length - 1].scrollIntoView(true);
    }, [chatData])
    return (
        <div className="w-[40%] h-full">
            <div className="bg-white border-b border-black flex p-2 h-[9.1%] justify-between items-center">
                <h3 className="text-lg">
                    チャット
                </h3>
                <button className="text-2xl" onClick={(e) => getNewMessage(e)}>
                    🔁
                </button>
            </div>

            <ul className="max-h-[80%] h-[80%] overflow-y-scroll" id="chat-area" ref={focusRef}>
                {
                    chatData.length > 0
                        ? (
                            chatData.map((data) => (
                                <Fragment key={data.message_id}>
                                    {
                                        data.message_user.user_id === userdata.user_id
                                            ? <MyMessage data={data} chatData={chatData} setChatData={setChatData} />
                                            : <Message data={data} />
                                    }
                                </Fragment>
                            ))
                        )
                        : (
                            <div className="h-full grid items-center justify-center">
                                <div className="bg-white h-24 grid items-center justify-center w-52">
                                    <p>
                                        メッセージを送ってみましょう！
                                    </p>
                                </div>
                            </div>
                        )
                }
            </ul>
            <ChatForm hundleSendMessage={hundleSendMessage} />
        </div>
    )
}
