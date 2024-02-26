import TitleBar from "../public-components/TitleBar"
import { useLoaderData } from "react-router-dom"
import SubmissionsList from "./components/SubmissionsList"
import SubTitleBar from "../public-components/SubTitleBar"

export async function LoadAllAssignmentData(params) {
    const allAst = await fetch(`http://localhost:8000/api/assignment/all`, {
        method: 'GET',
        credentials: 'include'
    })
        .then((res) => res.json())
        .then((data) => data)
        .catch((err) => console.log(err))

    return { allAst }
}
export default function AllSubmissions() {
    const { allAst } = useLoaderData();
    return (
        <div className="h-screen">
            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around
            ">
                <TitleBar title={"課題一覧"} />
            </header>

            <SubTitleBar title={'1年生'} />
            <SubmissionsList ast_data={allAst.first} />
            <SubTitleBar title={'2年生'} />
            <SubmissionsList ast_data={allAst.second} />
        </div>
    )
}