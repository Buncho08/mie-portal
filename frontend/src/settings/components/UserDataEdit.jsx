import Cookies from 'js-cookie';

export default function UserDataEdit({ setViewEdit, userdata }) {

    const hundleUpdateUser = async (e) => {
        e.preventDefault();
        const sendData = new FormData();

        if (e.target.user_icon.files[0]) {
            sendData.append('user_icon', e.target.user_icon.files[0]);
        }
        sendData.append('user_last', e.target.user_last.value);
        sendData.append('user_first', e.target.user_first.value);
        const status = await fetch('http://localhost:8000/api/myaccount/update', {
            method: 'PATCH',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        location.reload();
    }
    return (
        <div className="absolute w-[80%] bg-white h-[80%] m-auto top-0 left-0 right-0 bottom-0">
            <div className="bg-blue w-full h-14 flex justify-between items-center p-4">
                <p className="text-white">
                    プロフィールの編集
                </p>
                <button onClick={() => setViewEdit(false)} className="bg-white w-10 h-10 text-4xl">
                    <p>✕</p>
                </button>
            </div>

            <form onSubmit={hundleUpdateUser}>
                <div className="">
                    <img src={`http://localhost:8000/api${userdata.user_icon}`} alt="" width={150} height={150} className="bg-slate-400 rounded-full" />
                </div>
                <input type="file" name="user_icon" id="user_icon" />
                <input type="text" name="user_last" id="user_last" className='border-2 border-blue' />
                <input type="text" name="user_first" id="user_first" className='border-2 border-blue' />
                <button type="submit">
                    変更
                </button>
            </form>
        </div >
    )
}