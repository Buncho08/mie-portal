export default function UserModal({ userdata, setViewUser }) {
    const usergrade = ['情報システム学科1年生', '情報システム学科2年生', '教師']
    return (
        <div className="absolute w-[80%] bg-white h-[80%] m-auto top-0 left-0 right-0 bottom-0">
            <div className="bg-blue w-full h-14 flex justify-between items-center p-4">
                <p className="text-white">
                    {userdata.user_last} {userdata.user_first} さんのプロフィール
                </p>
                <button onClick={() => setViewUser({})} className="bg-white w-10 h-10 text-4xl">
                    <p>✕</p>
                </button>
            </div>

            <div className="h-[27%] relative">
                <div className="flex absolute mx-16 top-4">
                    <img src={`http://localhost:8000/api${userdata.user_icon}`} alt="" className='rounded-full' width={150} height={150} />
                    <div className="grid items-end mx-5 mb-2">
                        <div>
                            <p>
                                {usergrade[userdata.user_grade]}
                            </p>
                            <p className="text-2xl mt-1">
                                {userdata.user_last} {userdata.user_first}
                            </p>
                        </div>
                    </div>
                </div>
                <div className="bg-blue w-full h-[50%]">
                </div>
                <div className="bg-white w-full h-[50%]">

                </div>
            </div>

            <div className="mx-10 mt-4">
                <div className="w-full h-10 bg-blue">
                    これすき！
                </div>
            </div>
        </div >
    )
}