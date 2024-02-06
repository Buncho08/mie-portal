import { useLoaderData, Link } from "react-router-dom";

export async function LoadTeamData() {
    const teamlist = await fetch('http://localhost:8000/api/team', {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    return { teamlist }
}

export default function TeamTop() {
    const { teamlist } = useLoaderData();
    return (
        <ul>
            {teamlist.map((data) => (
                <Link key={data.team_id} to={`/team/${data.team_id}`} >
                    {data.team_name}
                </Link>
            ))}
        </ul>
    )
}