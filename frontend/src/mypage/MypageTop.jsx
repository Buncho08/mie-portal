import Notice from "./components/Notice";
import Classes_day_students from "./components/classes_day_students";
import Classes_day_teacher from './components/classes_day_teacher';
import NotSubmissions from "./components/NotSubmissions";
import TitleBar from "../public-components/TitleBar";
import { UserData } from '../root/root';
import { useContext } from "react";
import { useLoaderData, Link } from "react-router-dom";

export async function LoadMypageData() {
    const mypagedata = await fetch(`${import.meta.env.VITE_BACKEND_URI}/mypage`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { mypagedata }
}

export default function MypageTop() {
    // root.jsxで作ったcontext
    const userdata = useContext(UserData);
    const { mypagedata } = useLoaderData()
    const bgList = [
        "bg-[radial-gradient(77.95%_77.95%_at_74.66%_58.07%,rgba(255,254,220,0.1)_0%,rgba(255,255,255,0.152)_62.28%,rgba(255,255,255,0)_100%),radial-gradient(89.67%_70.39%_at_93.75%_92.16%,#29C2D7_0%,rgba(144,160,215,0.09)_52.46%,rgba(255,156,156,0.1)_100%),radial-gradient(68.86%_68.86%_at_94.55%_1.7%,rgba(250,208,144,0.3)_0%,rgba(250,220,144,0)_100%),linear-gradient(130.87deg,rgba(245,115,122,0.18)_3.47%,rgba(245,115,122,0)_77.25%)] bg-blend-[overlay,normal,normal,normal,normal,normal] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(255,255,255,0.2)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0.2)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(255,179,171,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(255,179,171,0.3)_0%,rgba(176,255,231,0.2)_70%),linear-gradient(to_right,rgba(98,87,147,0.2)_0%,rgba(213,93,100,0.2)_35%,rgba(228,145,41,0.2)_65%,rgba(192,103,28,0.2)_100%)] bg-blend-[overlay,luminosity,color-dodge,saturation,screen,color] backdrop-blur-[73px]",
        "bg-[radial-gradient(ellipse_at_50%_50%,rgba(184,248,255,0.4)_0%,rgba(255,255,255,0)_100%),radial-gradient(ellipse_at_70%_60%,rgba(145,217,230,0.3)_0%,rgba(230,145,174,0.3)_90%),radial-gradient(ellipse_at_30%_30%,rgba(145,217,230,0.3)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,_rgba(192,103,28,0.2)_0%,rgba(230,145,174,0)_70%),linear-gradient(to_left,rgba(184,248,255,0.4)_0%,rgba(213,93,100,0)_35%,rgba(228,145,41,0)_65%,rgba(184,248,255,0.4)_100%)] bg-blend-[overlay,luminosity,nomal,saturation,screen,overlay] backdrop-blur-[90px]",
        "bg-[radial-gradient(ellipse_at_70%_60%,rgba(195,224,96,0)_0%,rgba(195,224,96,0)_90%),radial-gradient(ellipse_at_30%_30%,rgba(195,224,96,0.1)_0%,rgba(195,224,96,0)_60%),radial-gradient(ellipse_at_bottom_left,rgba(0,163,203,0.2)_0%,rgba(0,163,203,0)_70%),radial-gradient(ellipse_at_bottom_right,rgba(98,87,147,0.1)_0%,rgba(213,93,100,0.1)_35%,rgba(228,145,41,0.1)_65%,rgba(192,103,28,0.1)_100%)] bg-blend-overlay bg-blend-luminosity bg-blend-color-dodge bg-blend-saturation bg-blend-screen bg-blend-color backdrop-blur-[70px]"
    ]
    return (
        <div className="h-screen">
            <header
                className={`
            h-32 ${bgList[1]} bg-center flex justify-around px-side-side
            `}>
                <TitleBar title={'マイページ'} />
            </header>
            <>
                {
                    userdata.user_grade !== 2 && <NotSubmissions user_notsubmissions={mypagedata.user_notsubmissions} />
                }
            </>
            <div className="px-side-side pb-10">

                <Notice user_notice={mypagedata.user_notice} />
                <>
                    {userdata.user_grade === 2
                        ? (
                            <>
                                <div className="px-side py-yspace">
                                    <Link
                                        className="hover:text-banner"
                                        to={`/mie/submissions`}>
                                        <h3 className="text-2xl font-bold">
                                            課題一覧へ→
                                        </h3>
                                    </Link>
                                    <div className="h-[0.1px] w-7/12 bg-midnight">

                                    </div>
                                </div>
                                <Classes_day_teacher user_classes={mypagedata.user_classes} />
                            </>
                        )
                        : <Classes_day_students user_classes={mypagedata.user_classes} />
                    }
                </>
            </div>
        </div>
    )
}