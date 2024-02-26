

export default function User({ usersdata, setViewUser }) {
    return (
        <div className="w-[80%] my-2 grid grid-cols-6 gap-2 justify-center items-center">
            {
                usersdata.map((data) => (
                    <div className="" key={data.user_id}>
                        <div className="grid justify-center items-center">
                            <button onClick={() => setViewUser(data)}>
                                <img src={`${import.meta.env.VITE_BACKEND_URI}${data.user_icon}`} alt="" className="rounded-full shadow-md" width={100} height={100} />
                            </button>
                        </div>

                        <p className="text-center mt-2">
                            {data.user_last} {data.user_first}
                        </p>
                    </div>
                ))
            }
        </div>
    )
}