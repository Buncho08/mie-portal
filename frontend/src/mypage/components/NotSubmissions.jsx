import { Link } from "react-router-dom"

export default function NotSubmissions({ user_notsubmissions }) {

    return (
        <>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    未提出の課題
                </h3>
            </div>
            <ul>

                {user_notsubmissions.map((data) => (
                    <Link key={data.ast_id} to={`http://localhost:3000/mie/class/${data.ast_classes.class_id}`}>
                        <li className='flex'>
                            <p>{data.ast_title}</p>
                            <p>{data.ast_limit}</p>
                            <p>{data.ast_classes.class_name}</p>
                        </li>
                    </Link>
                ))}
            </ul>
        </>
    )
}

