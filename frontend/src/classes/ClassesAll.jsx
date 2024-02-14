import { useLoaderData } from "react-router-dom"
import Class from "./components/Class";
export async function LoadClassesData() {
    const classes = await fetch('http://localhost:8000/api/classes', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    return { classes }
}

export default function ClassesAll() {
    const { classes } = useLoaderData();
    return (
        <div>
            <div className="bg-slate-400 p-2">
                <h3 className="text-base">
                    1年生
                </h3>
            </div>
            <ul>
                {classes.first.map((data, index) => (
                    <Class classdata={data} key={index} />
                ))}
            </ul>
            <div className="bg-slate-400 p-2">
                <h3 className="text-base">
                    2年生
                </h3>
            </div>
            <ul>
                {classes.second.map((data, index) => (
                    <Class classdata={data} key={index} />
                ))}
            </ul>
        </div>
    )
}