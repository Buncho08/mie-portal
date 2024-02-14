import { useEffect } from "react"

export default function NotsubmissionStds(params) {
    // useEffect(() => {
    //     let ignore = false;
    //     fetchAssignment(classdata.class_id).then(res => {
    //         if (!ignore) {
    //             setAssignment(res)
    //         }
    //     })

    //     return () => {
    //         ignore = true
    //     }
    // }, [])
    return (
        <>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    未提出の学生
                </h3>
            </div>
        </>
    )
}