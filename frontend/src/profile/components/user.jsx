import { Link } from "react-router-dom";

export default function User({ usersdata, setViewUser }) {
    return (
        <div className="w-[80%] my-2 grid grid-cols-6 gap-2 justify-center items-center">
            {
                usersdata.map((data) => (
                    <div className="" key={data.user_id}>
                        <div className="grid justify-center items-center">
                            <button onClick={() => setViewUser(data)}>
                                <img src={`http://localhost:8000/api${data.user_icon}`} alt="" className="rounded-full" width={100} height={100} />
                            </button>
                        </div>

                        <p className="text-center">
                            {data.user_last} {data.user_first}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}