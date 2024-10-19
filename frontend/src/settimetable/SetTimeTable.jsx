import { useLoaderData, Link } from "react-router-dom"
import TimeTable from "./components/timetable"
import Cookies from 'js-cookie';
import TitleBar from "../public-components/TitleBar";
import SubTitleBar from "../public-components/SubTitleBar";
import StdTimeTable from "./components/std_TimeTable";
import { useContext } from "react";
import { UserData } from '../root/root';

export async function LoadTimeTableData(params) {
    const timetable = await fetch(`${import.meta.env.VITE_BACKEND_URI}/timetable`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    const classes = await fetch(`${import.meta.env.VITE_BACKEND_URI}/classes`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    console.log(timetable)
    console.log(classes);
    return { timetable, classes }
}

export default function SetTimeTable(params) {
    const { timetable, classes } = useLoaderData();
    const userdata = useContext(UserData);
    const hundleUpdateTable = async (e, time_day, time_section, time_grade) => {
        const sendData = new FormData();
        sendData.append('time_grade', time_grade);
        sendData.append('time_day', time_day);
        sendData.append('time_section', time_section);
        if (e.target.value === 'blank') {
            const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/timetable`, {
                method: 'DELETE',
                body: sendData,
                headers: {
                    'X-CSRFToken': `${Cookies.get('csrftoken')}`,
                },
                credentials: "include",
                mode: "cors",
            })
                .then((res) => res.json())
                .then((data) => console.log(data))
                .catch((err) => console.log(err))

            return <></>
        }
        sendData.append('class_id', e.target.value);

        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/timetable`, {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
    }
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
                h-32 ${bgList[3]} bg-center flex justify-around px-side-side
                `}>
                <TitleBar title={"時間割"} />

                <div className="self-end flex gap-3 items-center m-4 w-96 text-xl">
                    <Link
                        to={"/mie/classes"}
                        className="grid justify-center items-center text-banner hover:text-midnight h-12 w-32 rounded-lg">
                        授業一覧へ
                    </Link>
                </div>
            </header>

            <div className="mx-auto pb-10 w-[80%] ">

                {
                    userdata.user_grade === 2
                        ? (
                            <>
                                <SubTitleBar title={'1年生'} />
                                <TimeTable timetable={timetable.first} hundleUpdateTable={hundleUpdateTable} classes={classes.first} time_grade={0} />
                                <SubTitleBar title={'2年生'} />
                                <TimeTable timetable={timetable.second} hundleUpdateTable={hundleUpdateTable} classes={classes.second} time_grade={1} />
                            </>

                        )
                        : (
                            <>
                                {
                                    userdata.user_grade === 0 ? (
                                        <>
                                            <SubTitleBar title={'1年生'} />
                                            <StdTimeTable timetable={timetable.first} hundleUpdateTable={hundleUpdateTable} classes={classes.first} time_grade={0} />
                                        </>
                                    )
                                        :
                                        (
                                            <>
                                                <SubTitleBar title={'2年生'} />
                                                <StdTimeTable timetable={timetable.second} hundleUpdateTable={hundleUpdateTable} classes={classes.second} time_grade={1} />
                                            </>
                                        )
                                }

                            </>

                        )
                }


            </div>
        </div>
    )
}