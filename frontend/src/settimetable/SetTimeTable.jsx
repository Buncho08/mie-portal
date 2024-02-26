import { useLoaderData, Link } from "react-router-dom"
import TimeTable from "./components/timetable"
import Cookies from 'js-cookie';
import TitleBar from "../public-components/TitleBar";
import SubTitleBar from "../public-components/SubTitleBar";
import StdTimeTable from "./components/std_TimeTable";
import { useContext } from "react";
import { UserData } from '../root/root';
import bgimg from '/class_bg.webp';

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


    return (
        <div className="h-screen">
            <header
                className={`
                h-32 bg-[url('${bgimg}')] bg-center flex justify-around px-side-side
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