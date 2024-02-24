import { useState } from "react"
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";
import SubTitleBar from "../../public-components/SubTitleBar";
import LinkModal from "./LinkModal";
import Confirmation from "../../public-components/Confirmation";
export default function TeamLink({ team_id, teamlink, setAlert }) {
    const [teamLink, setTeamLink] = useState(teamlink);
    const [viewFlg, setViewFlg] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [target, setTarget] = useState({
        'target': '',
        'target_data': {},
    });

    const hundleSubmit = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('team_id', team_id);
        sendData.append('link_title', e.target.link_title.value)
        sendData.append('link_URL', e.target.link_URL.value)
        const status = await fetch(`http://localhost:8000/api/team/link/${team_id}`, {
            method: 'POST',
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
        e.target.reset();
        setTeamLink([...teamLink, status]);
        setViewFlg(false);
        setAlert({
            'message': 'リンクを共有しました🔗',
            'disc': '',
            'status': 0
        })
    }

    const hundleDeleteLink = async (e) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/team/link/${target.target_data.link_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log())

        setTeamLink(teamLink.filter((data) => data.link_id !== target.target_data.link_id));
        setViewModal(false);
        setAlert({
            'message': `${target.target_data.link_title}を削除しました👋`,
            'disc': '',
            'status': 0
        });
        setTarget({
            'target': '',
            'target_data': {}
        })
    }
    return (
        <div className="w-full">
            {
                // 削除確認
                viewModal
                && (
                    <Confirmation target={target} dofunc={hundleDeleteLink} setFlg={setViewModal} />
                )
            }
            {
                viewFlg > 0 && (
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0">
                        <LinkModal hundleSubmit={hundleSubmit} setViewFlg={setViewFlg} viewFlg={viewFlg} />
                    </div>
                )
            }
            <div className="grid grid-cols-8 px-side py-yspace">
                <h2 className="grid items-center px-1 text-2xl font-bold col-start-1 col-span-2 row-span-1 row-start-1">
                    共有されたリンク
                </h2>
                <button className="col-start-6 col-span-2 row-span-1 row-start-1
                    bg-sky-200 rounded-lg my-1 h-10 hover:bg-banner hover:text-white
                    "
                    onClick={() => setViewFlg(true)}
                >
                    ＋リンクを共有
                </button>
                <div className="h-[0.1px] bg-midnight col-span-7 row-start-2">

                </div>
            </div>
            <div className="bg-white p-2">
                {/* {console.log(teamLink.length)} */}
                {
                    teamLink.length > 0
                        ? (
                            <ul className="px-side-side text-base">
                                {
                                    teamLink.map((data) => (
                                        <li key={data.link_id} className="list-none m-0 my-2">
                                            <Link to={data.link_URL} className="hover:text-banner">
                                                {data.link_title ? (data.link_title) : (data.link_URL)}
                                            </Link>
                                            <button onClick={(e) => {
                                                setViewModal(true);
                                                setTarget({
                                                    'target': data.link_title,
                                                    'target_data': data
                                                })
                                            }}>
                                                🗑️
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                        : (
                            <ul className="px-side-side text-base">
                                <li className="my-2">
                                    共有されたリンクはありません
                                </li>
                            </ul>
                        )
                }
            </div>
        </div>
    )
}
