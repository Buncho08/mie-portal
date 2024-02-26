import ChatForm from "./chatForm";
import Chat from "./Chat";
// チャットだけ再レンダリング、再取得できるようにしたい

export default function ChatArea({ teammessage, team_id }) {
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ]
    const rd = Math.floor(Math.random() * 4);
    console.log(rd);
    return (
        <div className="w-[40%] h-full">

            <div className="bg-white border-b border-gray-400 flex p-2 h-[9.1%] justify-between items-center shadow-[inset_0px_-3px_20px_5px_rgba(88,114,168,0.08)]">
                <h3 className="text-lg ml-5">
                    チャット
                </h3>
                <button className="text-2xl" onClick={(e) => getNewMessage(e)}>
                    🔁
                </button>
            </div>


            <Chat teammessage={teammessage} team_id={team_id} bg={bgList[rd]} />


        </div>
    )
}
