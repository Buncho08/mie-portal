import Cookies from 'js-cookie';
import { UserData } from '../../root/root';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SubTitleBar from '../../public-components/SubTitleBar';
import Confirmation from "../../public-components/Confirmation"


export default function Assignment_teacher({ class_id, setAlert }) {
    const [viewModal, setViewModal] = useState(false);
    const [assignmentData, setAssignment] = useState([]);
    const [target, setTarget] = useState({
        'target': '',
        'target_data': {}
    })

    async function fetchAssignment(class_id) {
        const data = await fetch(`http://localhost:8000/api/assignment/${class_id}`, {
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
        fetchAssignment(class_id).then(res => {
            if (!ignore) {
                setAssignment(res)
            }
        })

        return () => {
            ignore = true
        }
    }, [])

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
        if (status.error) {
            setAlert({
                'message': status.error,
                'disc': '',
                'status': 1,
            });
            return <></>;
        }
        setAlert({
            'message': '課題を登録しました。',
            'disc': '',
            'status': 0,
        });
        setAssignment([...assignmentData, status])
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
        setAlert({
            'message': `${status.ast_title}の情報を更新しました。`,
            'disc': '',
            'status': 0,
        });
        return <></>
    }

    const hundleDeleteAssignment = async (e) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/assignment/${target.target_data.ast_id}`, {
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
        setAlert({
            'message': `課題を削除しました。`,
            'disc': '',
            'status': 0,
        });
        setAssignment(assignmentData.filter((data) => data.ast_id !== target.target_data.ast_id));
        setTarget({
            'target': '',
            'target_data': {}
        })
        setViewModal(false);
        return <></>
    }

    return (
        <section>
            {
                viewModal && (
                    <Confirmation target={target} dofunc={hundleDeleteAssignment} setFlg={setViewModal} />
                )
            }
            <SubTitleBar title={'提出物'} />

            <div className="bg-white px-side grid grid-cols-3 gap-3 w-2/3">
                {assignmentData.map((data) => (

                    <div key={data.ast_id} className="col-span-1 border-4 rounded-lg p-3 h-48">
                        <form onSubmit={(e) => hundleUpdateAssignment(e, data.ast_id)}>
                            <input type="text" className='text-lg outline-0 font-semibold' name="update_title" defaultValue={data.ast_title} required />
                            <br />
                            <input type="text" name="update_disc" className='outline-0' defaultValue={data.ast_disc} />
                            <br />
                            <input type="date" className='self-end mt-3' name="update_limit" defaultValue={data.ast_limit} />
                            <div className="flex my-1 justify-end">
                                <button
                                    className='mx-3'
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setViewModal(true);
                                        setTarget({
                                            'target': data.ast_title,
                                            'target_data': data
                                        });
                                    }}>
                                    🗑️
                                </button>
                                <button type='submit' className='h-8 w-20 rounded-lg bg-bermuda  hover:text-white hover:bg-banner'>
                                    更新
                                </button>
                            </div>
                        </form>
                        <Link
                            className='col-span-2 grid justify-end col-start-3 text-center hover:text-banner border-b border-blue'
                            to={`/mie/assignments/${class_id}/${data.ast_id}`}>
                            課題ページへ ➡
                        </Link>
                    </div>
                ))}

                <div className="col-span-1 border-4 rounded-lg p-3 h-48">
                    <form onSubmit={hundleAddAssignment}>
                        <input type="text" className='text-lg outline-0 font-semibold' name="title" placeholder='課題タイトル' required />
                        <br />
                        <input type="text" name="disc" className='outline-0' placeholder='課題の説明(空欄可)' />
                        <br />
                        <label htmlFor="limit">
                            期限 :
                            <input type="date" className='outline-0 border border-gray-700 self-end mt-3 ml-3' name="limit" required />
                        </label>
                        <div className="flex my-7 justify-end">
                            <button type='submit' className='h-8 w-20 rounded-lg bg-bermuda  hover:text-white hover:bg-banner'>
                                登録
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}