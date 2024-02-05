import { UserData } from '../../root/root';
import { useContext } from "react";
import Cookies from 'js-cookie';

export default function Notice({ class_id, notice_main }) {
    const userdata = useContext(UserData);

    const hundleUpdateNoticeForm = async (e) => {
        e.preventDefault();

        const sendNotice = new FormData();
        console.log(e.target.notice.value);
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
                console.log(data);
            })
    }

    return (
        <section>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    おしらせ
                </h3>
            </div>
            <div className="bg-white p-2">
                {userdata.user_grade === 2
                    ? (
                        // 教師は編集できる
                        <form onSubmit={hundleUpdateNoticeForm}>
                            <input type="text" name="notice" id="notice" defaultValue={notice_main} />
                            <button type="submit">
                                送信
                            </button>
                        </form>
                    )
                    : (
                        // 学生は表示するだけ
                        <p>
                            {notice_main}
                        </p>
                    )
                }

            </div>
        </section>
    )
}