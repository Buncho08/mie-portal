import { useState } from "react"

export default function AddTeam({ hundleAddTeam, team_grade }) {
    const [viewForm, setViewForm] = useState(false);
    return (
        <div>
            <button onClick={() => setViewForm(!viewForm)}>
                チームを追加
            </button>
            <form className={`${viewForm ? 'visible' : 'hidden'}`} onSubmit={hundleAddTeam}>
                <input type="hidden" name="team_grade" value={team_grade} />
                <input type="text" name="team_name" id="team_name" />
                <br />
                <button type="submit">
                    登録
                </button>
            </form>
        </div>
    )
}