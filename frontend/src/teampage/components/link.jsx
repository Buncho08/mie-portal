import { useState } from "react"
import Cookies from 'js-cookie';
import { Link } from "react-router-dom";

export default function TeamLink({ team_id, teamlink }) {
    const [teamLink, setTeamLink] = useState(teamlink);

    const hundleSubmit = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('team_id', team_id);
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
        setTeamLink([...teamLink, status])
    }

    const hundleDeleteLink = async (e, link_id) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/team/link/${link_id}`, {
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

        setTeamLink(teamLink.filter((data) => data.link_id !== link_id))
    }
    return (
        <>
            <div className="bg-slate-400 flex items-center p-2 h-[8%]">
                <h3 className="text-lg">
                    リンクを追加する
                </h3>
            </div>
            <div className="bg-white p-2">
                <form onSubmit={(e) => hundleSubmit(e)}>
                    <input type="text" name="link_URL" id="link_URL" />
                    <button type="submit">
                        送信
                    </button>
                </form>
            </div>
            <div className="bg-slate-400 flex items-center p-2 h-[8%]">
                <h3 className="text-lg">
                    共有されたリンク
                </h3>
            </div>
            <div className="bg-white p-2">
                {/* {console.log(teamLink.length)} */}
                {
                    teamLink.length > 0
                        ? (
                            <ul>
                                {
                                    teamLink.map((data) => (
                                        <li key={data.link_id}>
                                            <Link to={data.link_URL}>
                                                {data.link_URL}
                                            </Link>
                                            <button onClick={(e) => hundleDeleteLink(e, data.link_id)}>
                                                🗑️
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                        : (
                            <p>
                                共有されたリンクはありません
                            </p>
                        )
                }
            </div>
        </>
    )
}
