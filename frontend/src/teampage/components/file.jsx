import { useState } from "react"
import { Link } from "react-router-dom"
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';
import SubTitleBar from '../../public-components/SubTitleBar'
import FileModal from "./FileModal";
import Confirmation from "../../public-components/Confirmation";

export default function File({ team_id, teamfile, setAlert }) {
    const [file, setFile] = useState(teamfile);
    const [filename, setFilename] = useState('');
    const [viewFlg, setViewFlg] = useState(false);
    const [viewModal, setViewModal] = useState(false);
    const [target, setTarget] = useState({
        'target': '',
        'target_data': {},
    })

    const hundleUploadFile = async (e) => {
        e.preventDefault();
        const filename = `${e.target.file_name.value}${e.target.file_name_ex.value}`
        console.log(filename)
        const sendData = new FormData();
        sendData.append('team_id', team_id);
        sendData.append('file_obj', e.target.file_obj.files[0]);
        sendData.append('file_name', filename);
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/file/${team_id}`, {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log())
        setFilename('');
        e.target.reset();
        if (status.error) {
            setAlert({
                'message': status.error,
                'disc': 'ファイル名を変更してください。',
                'status': 1,
            });
            return <></>
        }
        setFile([...file, status]);
        setViewFlg(false);
        setAlert({
            'message': 'ファイルをアップロードしました📂',
            'disc': '',
            'status': 0
        })
    }

    const downloadFile = async (e, url, filename) => {
        e.preventDefault();
        const data = await fetch(url);
        const blob = await data.blob();
        saveAs(blob, filename);
        return 0
    }

    const hundleDeleteFile = async () => {
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/team/file/${target.target_data.file_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log())

        setFile(file.filter((data) => data.file_id !== target.target_data.file_id));
        setViewModal(false);
        setAlert({
            'message': `${target.target_data.file_name}を削除しました👋`,
            'disc': '',
            'status': 0
        });
        setTarget({
            'target': '',
            'target_data': {}
        });
    }

    return (
        <div className="w-full">
            {
                // 削除確認
                viewModal
                && (
                    <Confirmation target={target} dofunc={hundleDeleteFile} setFlg={setViewModal} />
                )
            }

            {
                viewFlg && (
                    <div className="bg-cover-gray absolute h-full z-40 w-full top-0 left-0">
                        <FileModal hundleUploadFile={hundleUploadFile} setFilename={setFilename} filename={filename} setViewFlg={setViewFlg} viewFlg={viewFlg} />
                    </div>
                )
            }

            <div className="w-full grid grid-cols-8 px-side py-yspace">
                <h2 className="grid items-center px-1 text-2xl font-bold col-start-1 col-span-3 row-span-1 row-start-1">
                    共有されたファイル
                </h2>

                <button onClick={() => setViewFlg(true)}
                    className="col-start-5 col-span-2 row-span-1 row-start-1 mb-2 relative w-64 inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all  bg-gradient-to-br from-gray-100 via-gray-200 to-gray-200 rounded-xl group">
                    <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-100 ease-in-out  bg-gradient-to-br from-sky-500 via-banner to-sky-500 rounded group-hover:-mr-4 group-hover:-mt-4">
                        <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
                    </span>
                    <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-400 ease-in-out delay-200 -translate-x-full translate-y-full  bg-gradient-to-br from-sky-500 via-banner to-sky-500 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
                    <span className="relative w-full text-gray-900 text-center transition-colors duration-200 ease-in-out group-hover:text-white">
                        ＋ファイルを共有
                    </span>
                </button>

                <div className="h-[0.1px] bg-midnight col-span-7 row-start-2">

                </div>
            </div>
            <div className="p-2">

                {
                    file.length > 0
                        ? (
                            <ul className="px-side-side text-base">
                                {
                                    file.map((data) => (
                                        <li key={data.file_id} className="my-2">
                                            <Link
                                                className="hover:text-banner"
                                                onClick={(e) => downloadFile(e, `${import.meta.env.VITE_BACKEND_URI}/file/team/${data.file_name}`, data.file_name.split('/')[1])}>
                                                {data.file_name.split('/')[1]}
                                            </Link>
                                            <button onClick={(e) => {
                                                setTarget({
                                                    'target': data.file_name.split('/')[1],
                                                    'target_data': data
                                                })
                                                setViewModal(true);
                                            }}>
                                                🗑️
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                        : (
                            <ul className="px-side-side text-base">
                                <li className="my-2">
                                    共有されたファイルはありません
                                </li>
                            </ul>
                        )
                }
            </div>
        </div>
    )
}