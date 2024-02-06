import { useLoaderData } from "react-router-dom";

export async function LoadTeamPageData({ params }) {
    const teamdata = await fetch(`http://localhost:8000/api/team/chat/${params.team_id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))
    return { teamdata }
}

export default function TeamPage() {
    const { teamdata } = useLoaderData();
    return (
        <>
            {
                teamdata.length > 0
                    ? (
                        teamdata.map((data) => (
                            <div key={data.message_id}>
                                {data.message}
                            </div>
                        ))
                    )
                    : (
                        <p>
                            チャット履歴がありません
                        </p>
                    )
            }
        </>
    )
}