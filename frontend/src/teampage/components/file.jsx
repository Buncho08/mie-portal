import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import Cookies from 'js-cookie';
import { saveAs } from 'file-saver';

export default function File({ team_id, teamfile }) {
    const [file, setFile] = useState(teamfile)
    const [filename, setFilename] = useState('')

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
    }

    const downloadFile = async (e, url, filename) => {
        e.preventDefault();
        const data = await fetch(url);
        const blob = await data.blob();
        saveAs(blob, filename);
        return 0
    }

    const hundleDeleteFile = async (e, file_id) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/team/file/${file_id}`, {
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

        setFile(file.filter((data) => data.file_id !== file_id))
    }

    return (
        <>
            <div className="bg-slate-400 flex items-center p-2 h-[8%]">
                <h3 className="text-lg">
                    ファイルをおくる
                </h3>
            </div>
            <div className="bg-white p-2">
                <form onSubmit={hundleUploadFile}>
                    <input type="text" name="file_name" id="file_name" defaultValue={filename ? (filename.split('.').slice(0, -1)) : ('')} className="border border-gray-800 mx-2" />
                    <input type="text" name="file_name_ex" id="file_name_ex" readOnly defaultValue={filename ? (`.${filename.split('.')[filename.split('.').length - 1]}`) : ('')} />
                    <input type="file" name="file_obj" id="file_obj" onInput={(e) => { setFilename(e.target.files[0].name) }} />
                    <button type="submit" className="border border-gray-900">
                        送信
                    </button>
                </form>
            </div>
            <div className="bg-slate-400 flex items-center p-2 h-[8%]">
                <h3 className="text-lg">
                    共有されたファイル
                </h3>
            </div>
            <div className="bg-white p-2">

                {
                    file.length > 0
                        ? (
                            <ul>
                                {
                                    file.map((data) => (
                                        <li key={data.file_id}>
                                            <Link onClick={(e) => downloadFile(e, `http://localhost:8000/api/file/team/${data.file_name}`, data.file_name.split('/')[1])}>
                                                {data.file_name.split('/')[1]}
                                            </Link>
                                            <button onClick={(e) => hundleDeleteFile(e, data.file_id)}>
                                                🗑️
                                            </button>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                        : (
                            <p>
                                共有されたファイルはありません
                            </p>
                        )
                }
            </div>
        </>
    )
}