import { redirect, useLoaderData, Link } from "react-router-dom"
import { useState } from "react"
import TitleBar from "../../public-components/TitleBar"
import Alert from '../../public-components/Alert'
import { saveAs } from 'file-saver';
import JSZip from 'jszip';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload } from '@fortawesome/free-solid-svg-icons';
import Confirmation from '../../public-components/Confirmation';
import Cookies from 'js-cookie';

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
    const class_id = params.class_id;
    return { assignments, class_id }
}

export default function Assignments(params) {
    const { assignments, class_id } = useLoaderData();
    const [assignment, setAssignment] = useState(assignments);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    })
    const [viewModal, setViewModal] = useState(false);
    const [target, setTarget] = useState({
        'target': '',
        'target_data': {}
    })

    const hundleDelete = async (e) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/assignment/submition/${target.target_data.state_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => console.log(data))
            .catch((err) => console.log(err))
        setAlert({
            'message': `${target.target}を削除しました。`,
            'disc': '',
            'status': 0,
        });
        setAssignment(assignment.filter((data) => data.state_id !== target.target_data.state_id));
        setTarget({
            'target': '',
            'target_data': {}
        })
        setViewModal(false);
    }
    const downloadFile = async (e, url, filename) => {
        e.preventDefault();
        const data = await fetch(url);
        const blob = await data.blob();
        saveAs(blob, filename);
        setAlert({
            'message': `${filename}をダウンロードしました`,
            'disc': 'おつかれさまでした✨',
            'status': 0
        })
        return 0
    }

    const makeBlob = async () => {
        const datas = document.getElementsByClassName('data-url');
        const blobs = [];
        for (let i = 0; i < datas.length; i++) {
            let url = datas[i].textContent
            let data = await fetch(url);
            let blob = await data.blob();
            blobs.push([datas[i].textContent.split('/').slice(-1)[0], blob]);
        }

        return blobs
    }

    const downloadAllFileAsZip = async (e, Blobs, name) => {
        // e, url, filename
        e.preventDefault();
        const zipBlob = new JSZip();
        const folder = zipBlob.folder(name);

        Blobs.forEach(data => {
            folder.file(data[0], data[1]);
        })


        return zipBlob.generateAsync({ type: "blob" })
            .then(function (content) {
                if (name) {
                    saveAs(content, `${name}.zip`)
                    setAlert({
                        'message': 'まとめてダウンロードしました！',
                        'disc': 'zipファイルに圧縮しました。',
                        'status': 0
                    })
                }
                else {
                    setAlert({
                        'message': 'エラー',
                        'disc': 'ファイルがありません。',
                        'status': 1
                    })
                }

            });
    }

    return (
        <div className={`h-screen`}>
            {
                viewModal && (
                    <Confirmation target={target} dofunc={hundleDelete} setFlg={setViewModal} />
                )
            }
            {/* <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around
            ">
                <TitleBar title={`${assignment.length > 0 ? (`${assignment[0].state_ast.ast_title}`) : ('')} 提出状況`} />
            </header> */}

            <header
                className="
            h-32 bg-[url('/class_bg.webp')] bg-center flex justify-around
            ">
                <TitleBar title={`${assignment.length > 0 ? (`${assignment[0].state_ast.ast_title}`) : ('')} 提出状況`} />

                <div className="self-end flex gap-3 items-center m-4 w-96 text-xl">
                    <Link className="hover:text-banner" to={`http://localhost:3000/mie/class/${class_id}`}>
                        🔙授業ページへ戻る
                    </Link>
                </div>
            </header>
            <div className="overflow-x-auto w-[95%] mx-auto">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                    <thead className="ltr:text-left rtl:text-right">
                        <tr>
                            <th className="whitespace-nowrap pr-10 py-2 text-center font-medium text-gray-900">提出者</th>
                            <th className="whitespace-nowrap pr-10 py-2 text-center font-medium text-gray-900">提出日時</th>
                            <th className="whitespace-nowrap pr-10 py-2 text-center font-medium text-gray-900">ファイル名</th>
                            <th className="whitespace-nowrap pr-10 py-2 text-center font-medium text-gray-900">
                                <Link
                                    className="inline-block px-4 py-2 h-[40%] w-[140px] self-end text-center text-xs font-medium hover:text-indigo-700"
                                    onClick={async (e) => { await downloadAllFileAsZip(e, await makeBlob(), assignments.length > 0 ? assignments[0].state_ast.ast_title : false) }}>
                                    <FontAwesomeIcon icon={faDownload} /> すべてダウンロード
                                </Link>
                            </th>
                            <th className="whitespace-nowrap pr-10 py-2 text-center font-medium text-gray-900"></th>
                            <th className="px-4 py-2"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            assignment.length === 0
                                ? (
                                    <tr>
                                        <td className="font-bold text-center p-3">
                                            まだ誰も提出していません。
                                        </td>
                                    </tr>
                                )
                                : (
                                    <>
                                        {assignment.map((data) => (
                                            <tr key={data.state_id}>
                                                <td className="whitespace-nowrap pr-10 py-2 font-medium text-center text-gray-700">
                                                    {data.state_std}
                                                </td>
                                                <td className="whitespace-nowrap pr-10 py-2  text-gray-900 text-center">
                                                    {data.state_date}
                                                </td>
                                                <td className="whitespace-nowrap pr-10 py-2 text-center  text-gray-700">
                                                    <Link
                                                        className="hover:text-banner"
                                                        onClick={(e) => downloadFile(e, `http://localhost:8000/api/file/assignments/${data.state_ast.ast_classes.class_name}/${data.state_ast.ast_title}/${data.state_res}`, data.state_res)}
                                                    >
                                                        {data.state_res}
                                                    </Link>
                                                </td>
                                                <td className="whitespace-nowrap pr-10 py-2 text-center">
                                                    <Link
                                                        className="inline-block rounded bg-indigo-600 px-4 py-2 text-center text-xs font-medium text-white hover:bg-indigo-700"
                                                        onClick={(e) => downloadFile(e, `http://localhost:8000/api/file/assignments/${data.state_ast.ast_classes.class_name}/${data.state_ast.ast_title}/${data.state_res}`, data.state_res)}>
                                                        ダウンロード
                                                    </Link>
                                                </td>
                                                <td className="whitespace-nowrap pr-10 py-2 text-center">
                                                    <button
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setViewModal(true);
                                                            setTarget({
                                                                'target': data.state_res,
                                                                'target_data': data
                                                            })
                                                        }}>
                                                        🗑️
                                                    </button>
                                                </td>
                                                <td>
                                                    <p className="data-url hidden">
                                                        {`http://localhost:8000/api/file/assignments/${data.state_ast.ast_classes.class_name}/${data.state_ast.ast_title}/${data.state_res}`}
                                                    </p>
                                                </td>

                                            </tr>
                                        ))}
                                    </>
                                )
                        }

                    </tbody>
                </table>
            </div>
            {
                alert.message !== '' && (
                    <Alert alert={alert} setAlert={setAlert} />
                )
            }
        </div>
    )
}