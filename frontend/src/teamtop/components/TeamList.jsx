import { Link } from "react-router-dom"

export default function TeamList({ data }) {
    return (
        <li className="my-2 flex ">
            <Link key={data.team_id} to={`${data.team_id}`} className="hover:text-banner  text-[110%]">
                ・ {data.team_name}
            </Link>
        </li>
    )
}