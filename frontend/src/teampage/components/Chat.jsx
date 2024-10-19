import { Fragment, useContext, useState, useRef, useEffect } from "react";
import { UserData } from '../../root/root';
import Cookies from 'js-cookie';
import Message from "./message";
import MyMessage from "./mymessage";
import ChatForm from "./chatForm";

// チャットだけ再レンダリング、再取得できるようにしたい

export default function Chat({ teammessage, team_id, bg }) {
    const userdata = useContext(UserData);
    const [chatData, setChatData] = useState(teammessage);
    const focusRef = useRef(null);
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ]
    const rd = Math.floor(Math.random() * 4);
    console.log(rd);
    const hundleDeleteMessage = async (e, message_id) => {
        e.preventDefault();
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/chat/${message_id}`, {
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
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/chat/${team_id}`, {
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
        const message = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/chat/${team_id}`, {
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
        <>
            <ul className={`max-h-[80%] h-[80%] overflow-y-scroll ${bg}`} id="chat-area" ref={focusRef}>
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
                                <div className="font-bold h-24 grid items-center justify-center w-60">
                                    <p>
                                        メッセージを送ってみましょう！
                                    </p>
                                </div>
                            </div>
                        )
                }
            </ul>
            <ChatForm hundleSendMessage={hundleSendMessage} />

        </>
    )
}
