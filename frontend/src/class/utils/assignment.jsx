import { redirect } from "react-router-dom"

export async function fetchAssignment(class_id) {
    const data = await fetch(`http://localhost:8000/api/assignment/${class_id}`, {
        method: 'GET',
        credentials: "include",
    })
        .then((res) => {
            if (res.status >= 400) {
                return res.status
            }
            else {
                return res.json()
            }
        })
        .then((data) => {
            return data
        })
        .catch((err) => console.log(err))
    if (data >= 400) {
        return redirect('/mie/mypage')
    }
    return data
}