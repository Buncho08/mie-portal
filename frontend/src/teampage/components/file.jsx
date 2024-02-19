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
        const status = await fetch(`http://localhost:8000/api/team/file/${team_id}`, {
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
        const status = await fetch(`http://localhost:8000/api/team/file/${target.target_data.file_id}`, {
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
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0">
                        <FileModal hundleUploadFile={hundleUploadFile} setFilename={setFilename} filename={filename} setViewFlg={setViewFlg} viewFlg={viewFlg} />
                    </div>
                )
            }

            <div className="w-full grid grid-cols-8 px-side py-yspace">
                <h2 className="grid items-center px-1 text-2xl font-bold col-start-1 col-span-2 row-span-1 row-start-1">
                    共有されたファイル
                </h2>
                <button className="col-start-6 col-span-2 row-span-1 row-start-1
                    bg-sky-200 rounded-lg my-1 h-10 hover:bg-banner hover:text-white
                    "
                    onClick={() => setViewFlg(true)}
                >
                    ＋ファイルを共有
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
                                                onClick={(e) => downloadFile(e, `http://localhost:8000/api/file/team/${data.file_name}`, data.file_name.split('/')[1])}>
                                                ・ {data.file_name.split('/')[1]}
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