import { redirect, useLoaderData } from "react-router-dom"

export async function LoadAssignmentsData({ params }) {
    const assignments = await fetch(`http://localhost:8000/api/assignment/status/${params.ast_id}`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    if (assignments.detail) {
        return redirect('/mie/mypage')
    }
    return { assignments }
}

export default function Assignments(params) {
    const { assignments } = useLoaderData();
    return (
        <>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    提出物一覧
                </h3>
            </div>
            <div>
                {
                    assignments.length === 0 && (
                        <p>
                            まだ誰も提出していません。
                        </p>
                    )
                }
                {assignments.map((data) => (
                    <p>
                        {data.state_res}
                    </p>
                ))}
            </div>
        </>
    )
}