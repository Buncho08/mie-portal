import { useLoaderData } from "react-router-dom"
import { useState } from "react"
import TimeTable from "./components/timetable"
import CreateClasses from "./components/CreateClasses"
import Cookies from 'js-cookie';

export async function LoadTimeTableData(params) {
    const timetable = await fetch('http://localhost:8000/api/timetable', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    const classes = await fetch('http://localhost:8000/api/classes', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))


    const teachers = await fetch('http://localhost:8000/api/userView/teacher', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { timetable, classes, teachers }
}

export default function SetTimeTable(params) {
    const { timetable, classes, teachers } = useLoaderData();
    const [firstClasses, setFirstClasses] = useState(classes.first);
    const [secondClasses, setSecondClasses] = useState(classes.second);

    const hundleUpdateTable = async (e, time_day, time_section, time_grade) => {
        const sendData = new FormData();
        sendData.append('time_grade', time_grade);
        sendData.append('time_day', time_day);
        sendData.append('time_section', time_section);
        if (e.target.value === 'blank') {
            const status = await fetch('http://localhost:8000/api/timetable', {
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

        const status = await fetch('http://localhost:8000/api/timetable', {
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

    const hundleSubmit = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('user_id', e.target.user_id.value)
        sendData.append('class_name', e.target.class_name.value)
        sendData.append('class_grade', e.target.class_grade.value)
        const status = await fetch('http://localhost:8000/api/classes', {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data)
                if (e.target.class_grade.value == 0) {
                    setFirstClasses([...firstClasses, data])
                }
                else {
                    setSecondClasses([...secondClasses, data])
                }
            })
            .catch((err) => console.log(err))

    }
    return (
        <>
            <div className="w-full h-14 bg-blue p-2 flex items-center">
                <h2 className="text-2xl">
                    時間割の編集
                </h2>
            </div>
            <div>
                <p>
                    1年生
                </p>
            </div>
            <TimeTable timetable={timetable.first} hundleUpdateTable={hundleUpdateTable} classes={firstClasses} time_grade={0} />
            <div>
                2年生
            </div>
            <TimeTable timetable={timetable.second} hundleUpdateTable={hundleUpdateTable} classes={secondClasses} time_grade={1} />

            <div>
                新しく授業を作成
            </div>

            <CreateClasses teachers={teachers} hundleSubmit={hundleSubmit} />
            
        </>
    )
}