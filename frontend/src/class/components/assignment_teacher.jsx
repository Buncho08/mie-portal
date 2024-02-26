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

        setAssignment(assignmentData.map((data) => (
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
        <section className='pb-10'>
            {
                viewModal && (
                    <Confirmation target={target} dofunc={hundleDeleteAssignment} setFlg={setViewModal} />
                )
            }
            <SubTitleBar title={'提出物'} />

            <div className="bg-white px-side grid grid-cols-3 gap-3 w-2/3">
                {assignmentData.map((data) => (

                    <div key={data.ast_id} className="col-span-1 border-4 rounded-lg p-3 h-52">
                        <form onSubmit={(e) => hundleUpdateAssignment(e, data.ast_id)}>
                            <input type="text" className='text-lg w-full outline-1 outline-slate-200 font-semibold' name="update_title" defaultValue={data.ast_title} required />
                            <br />
                            <input type="text" name="update_disc" className='outline-1 outline-slate-200 w-full' defaultValue={data.ast_disc} />
                            <br />
                            <input type="date" className='self-end mt-3' name="update_limit" defaultValue={data.ast_limit} />
                            <Link
                                className='col-span-2 grid justify-end col-start-3 mt-3 h-6 text-center text-indigo-900 hover:text-banner'
                                to={`/mie/assignments/${class_id}/${data.ast_id}`}>
                                課題ページへ ➡
                            </Link>
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
                                <button type='submit' className="w-24 relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-banner rounded-xl group">
                                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-900 rounded group-hover:-mr-4 group-hover:-mt-4">
                                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                    </span>
                                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-gradient-to-br from-sky-500 via-banner to-sky-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                    <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                        更新
                                    </span>
                                </button>
                            </div>
                        </form>
                    </div>
                ))}

                <div className="col-span-1 border-4 rounded-lg p-3 h-52">
                    <form onSubmit={hundleAddAssignment}>
                        <input type="text" className='text-lg outline-1 outline-slate-200 w-full font-semibold' name="title" placeholder='課題タイトル' required />
                        <br />
                        <input type="text" name="disc" className='outline-1 outline-slate-200 w-full' placeholder='課題の説明(空欄可)' />
                        <br />
                        <label htmlFor="limit">
                            期限 :
                            <input type="date" className='outline-0 border border-gray-700 self-end mt-3 ml-3' name="limit" required />
                        </label>
                        <Link
                            className='col-span-2 grid justify-end col-start-3 mt-3 h-6'>
                        </Link>
                        <div className="flex my-1 justify-end">
                            <button type='submit' className="w-24 relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-banner rounded-xl group">
                                <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-500 ease-in-out bg-indigo-900 rounded group-hover:-mr-4 group-hover:-mt-4">
                                    <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                                </span>
                                <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-500 ease-in-out delay-200 -translate-x-full translate-y-full bg-gradient-to-br from-sky-500 via-banner to-sky-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                                <span className="relative w-full text-center text-white transition-colors duration-200 ease-in-out group-hover:text-white">
                                    登録
                                </span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )
}