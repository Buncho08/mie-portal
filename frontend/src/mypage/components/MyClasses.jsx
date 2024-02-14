import { useEffect, useState } from "react"
import { Link } from "react-router-dom";
export default function MyClasses() {
    const [myClasses, setMyClasses] = useState([]);
    async function fetchClasses() {
        const data = await fetch('http://localhost:8000/api/classes/teacher', {
            method: 'GET',
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        return data
    }
    useEffect(() => {
        let ignore = false;
        fetchClasses().then(res => {
            if (!ignore) {
                setMyClasses(res);
            }
        })

        return () => {
            ignore = true
        }
    }, [])
    return (
        <ul>
            {myClasses.map((data) => (
                <li key={data.class_id}>
                    <Link to={`http://localhost:3000/mie/class/${data.class_id}`}>
                        {data.class_name}
                    </Link>
                </li>
            ))}
        </ul>
    )
}