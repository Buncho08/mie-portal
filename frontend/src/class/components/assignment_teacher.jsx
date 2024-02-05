import Cookies from 'js-cookie';
import { redirect, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import { UserData } from '../../root/root';


export default function Assignment_teacher({ assignment, class_id, setAssignment }) {
    const user = useContext(UserData);

    // 課題を登録する、教師のみ
    const hundleAddAssignment = async (e) => {
        e.preventDefault();
        const sendAssignment = new FormData();
        sendAssignment.append('ast_title', e.target.title.value);
        sendAssignment.append('ast_disc', e.target.disc.value);
        sendAssignment.append('ast_limit', e.target.limit.value);
        sendAssignment.append('class_id', class_id);
        e.target.reset();
        const status = await fetch(`http://localhost:8000/api/assignment/${class_id}`, {
            method: 'POST',
            body: sendAssignment,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .catch((err) => {
                console.log(err);
            })

        setAssignment([...assignment, status])
        return <></>
    }

    // 課題情報を更新する 教師のみ
    const hundleUpdateAssignment = async (e, ast_id) => {
        e.preventDefault();
        const sendAssignment = new FormData();
        sendAssignment.append('ast_title', e.target.update_title.value);
        sendAssignment.append('ast_disc', e.target.update_disc.value);
        sendAssignment.append('ast_limit', e.target.update_limit.value);
        const status = await fetch(`http://localhost:8000/api/assignment/${ast_id}`, {
            method: 'PATCH',
            body: sendAssignment,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                return res.json()
            })
            .catch((err) => console.log(err))

        setAssignment(assignment.map((data) => (
            data.ast_id === ast_id
                ? status
                : data
        )));
        console.log(status)
        return <></>
    }

    const hundleDeleteAssignment = async (e, ast_id) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/assignment/${ast_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        setAssignment(assignment.filter((data) => data.ast_id !== ast_id));
        return <></>
    }

    return (
        <section>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    提出物
                </h3>
            </div>

            <div className="bg-white p-2 grid grid-cols-3">
                {
                    assignment.length === 0 && <p>課題はありません。</p>
                }
                {assignment.map((data) => (
                    <form key={data.ast_id} onSubmit={(e) => hundleUpdateAssignment(e, data.ast_id)} className='col-span-1 border-4 h-40'>
                        <input type="text" name="update_title" defaultValue={data.ast_title} />
                        <input type="text" name="update_disc" defaultValue={data.ast_disc} />
                        <input type="date" name="update_limit" defaultValue={data.ast_limit} />
                        <button type='submit' className='hidden'>
                            更新
                        </button>
                        <button onClick={(e) => hundleDeleteAssignment(e, data.ast_id)}>
                            🗑️
                        </button>
                    </form>
                ))}

                <div className='col-span-1'>
                    <form onSubmit={hundleAddAssignment} >
                        <input type="text" name="title" id="title" placeholder="課題タイトル" />
                        <input type="text" name="disc" id="disc" placeholder="課題の説明 空欄可" />
                        <input type="date" name="limit" id="limit" placeholder="英数字で6文字以上" />
                        <button type="submit">
                            登録
                        </button>
                    </form>
                </div>
            </div>
        </section>
    )
}