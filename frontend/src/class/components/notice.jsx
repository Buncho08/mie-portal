import { UserData } from '../../root/root';
import { useContext } from "react";
import Cookies from 'js-cookie';
import SubTitleBar from '../../public-components/SubTitleBar'


export default function Notice({ class_id, notice_main, setAlert }) {
    const userdata = useContext(UserData);

    const hundleUpdateNoticeForm = async (e) => {
        e.preventDefault();
        if (e.target.notice.value === '') {
            setAlert({
                'message': 'メッセージを入力してください。',
                'disc': 'メッセージが入力されていません。',
                'status': 1
            })

            return <></>
        }
        const sendNotice = new FormData();
        sendNotice.append('notice_main', e.target.notice.value);
        await fetch(`http://localhost:8000/api/notice/${class_id}`, {
            method: "PATCH",
            body: sendNotice,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAlert({
                    'message': 'お知らせを更新しました。',
                    'disc': '',
                    'status': 0
                })
            })
    }

    const hundleDeleteUpdate = async (e) => {
        e.preventDefault();
        const notice = document.getElementById('notice');
        notice.value = '';
        const sendNotice = new FormData();
        sendNotice.append('notice_main', notice.value);
        await fetch(`http://localhost:8000/api/notice/${class_id}`, {
            method: "PATCH",
            body: sendNotice,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAlert({
                    'message': 'お知らせを削除しました。',
                    'disc': '',
                    'status': 0
                })
            })
        return <></>
    }
    return (
        <section>
            <SubTitleBar title={'おしらせ'} />

            <div className="bg-white p-2">
                {userdata.user_grade === 2
                    ? (

                        // 教師は編集できる
                        <form onSubmit={hundleUpdateNoticeForm} className='mb-2'>
                            <div className='w-1/2 mx-side'>
                                <label htmlFor="OrderNotes" className="sr-only">Order notes</label>

                                <div
                                    className="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                >
                                    <textarea
                                        id="notice"
                                        name='notice'
                                        className="w-full outline-0 resize-none border-none align-top focus:ring-0 sm:text-sm"
                                        rows="4"
                                        defaultValue={notice_main}
                                        placeholder="お知らせを編集しましょう"
                                    ></textarea>

                                    <div className="flex items-center justify-end gap-2 bg-white p-3">
                                        <button
                                            onClick={hundleDeleteUpdate}
                                            type="button"
                                            className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                                        >
                                            Clear
                                        </button>

                                        <button
                                            type="submit"
                                            className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                                        >
                                            編集
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )
                    : (
                        // 学生は表示するだけ
                        <div className='mx-side-side'>
                            {notice_main
                                ? (
                                    <p>
                                        {notice_main}
                                    </p>
                                )
                                :
                                (
                                    <p>
                                        現在お知らせはありません。
                                    </p>
                                )
                            }
                        </div>
                    )
                }

            </div>
        </section>
    )
}