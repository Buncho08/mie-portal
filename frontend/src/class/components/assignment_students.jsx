import Cookies from 'js-cookie';
import { Fragment, useEffect, useState } from 'react';
import { UserData } from '../../root/root';
import SubTitleBar from '../../public-components/SubTitleBar';
import SectionTitleBar from '../../public-components/SectionTitleBar'
import { AssignmentArea } from './AssignmentArea';
import SubmssionAssignmentArea from './SubmmisionAssignmentArea';


export default function Assignment_students({ setAlert, class_id }) {
    const [assignmentData, setAssignment] = useState([]);

    async function fetchAssignment(class_id) {
        const data = await fetch(`${import.meta.env.VITE_BACKEND_URI}/assignment/${class_id}`, {
            method: 'GET',
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        return data
    }

    useEffect(() => {
        let ignore = false;
        fetchAssignment(class_id).then(res => {
            if (!ignore) {
                setAssignment(res)
            }
        })

        return () => {
            ignore = true
        }
    }, [])

    const fetchSubmittion = async (ast_id, sendData) => {
        const status = await fetch(`${import.meta.env.VITE_BACKEND_URI}/assignment/submition/${ast_id}`, {
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
            .catch((err) => console.log(err))

        if (!status) {
            setAlert(
                {
                    'message': 'エラー',
                    'disc': '提出したファイルを確認してください。複数ファイルはZipフォルダにしてください。',
                    'status': 1
                }
            )

            return <></>
        }
        setAssignment(assignmentData.map((item) => (
            item.ast_id === status.state_ast.ast_id
                ? (
                    {
                        "ast_id": item.ast_id,
                        "ast_title": item.ast_title,
                        "ast_disc": item.ast_disc,
                        "ast_limit": item.ast_limit,
                        "user_state": true
                    }
                )
                : item
        )));
        setAlert({
            'message': '提出しました!',
            'disc': 'おつかれさまでした✨',
            'status': 0
        })
    }
    // ドラッグアンドドロップで提出
    const hundleDropFile = async (e, ast_id) => {
        e.preventDefault();

        // MdNさんから拝借
        if (e.dataTransfer.items.length === 1) {
            // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
            [...e.dataTransfer.items].forEach((item, i) => {
                // ドロップしたものがファイルでない場合は拒否する
                if (item.name == '') {
                    setAlert({
                        'message': 'エラー',
                        'disc': '不正なファイルです。複数ファイルはzipにして提出してください。',
                        'status': 1
                    })
                    return false
                }
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    const sendData = new FormData();
                    sendData.append('assignment_file', file)
                    const status = fetchSubmittion(ast_id, sendData)
                }
                else {
                    setAlert({
                        'message': 'エラー',
                        'disc': '不正なファイルです。複数ファイルはzipにして提出してください。',
                        'status': 1
                    })
                    return false
                }
            });
        }
        else {
            setAlert({
                'message': 'エラー',
                'disc': '複数ファイルはzipにまとめて提出してください。',
                'status': 1
            })
        }
        return <></>
    }
    // ドラッグ動作をOFF
    const hundleDragOver = (e) => {
        e.preventDefault();
    }
    return (
        <section>
            <SubTitleBar title={'提出物'} />
            <p className='mx-side-side'>
                ✅課題のエリアにドラッグアンドドロップで提出してください
            </p>
            <SectionTitleBar title={'未提出'} />
            <div className="bg-white p-2 mx-side-side grid grid-cols-4 ">
                {
                    assignmentData.length > 0
                        ? (<>
                            {
                                assignmentData.map((data) => (
                                    <Fragment key={data.ast_id}>
                                        {data.user_state
                                            ? <></>
                                            : (
                                                <AssignmentArea data={data} hundleDropFile={hundleDropFile} hundleDragOver={hundleDragOver} />
                                            )
                                        }
                                    </Fragment>
                                ))
                            }
                        </>
                        )
                        : (
                            <p>
                                課題はありません。
                            </p>
                        )
                }


            </div>


            {
                assignmentData.length > 0
                && (
                    <>
                        <SectionTitleBar title={'提出済'} />
                        <div className="bg-white p-2 mx-side-side grid grid-cols-4 ">

                            {
                                assignmentData.map((data, index) => (
                                    <Fragment key={data.ast_id}>
                                        {data.user_state
                                            ? (
                                                <SubmssionAssignmentArea data={data} />
                                            )
                                            : <Fragment key={index * 1000}></Fragment>
                                        }
                                    </Fragment>
                                ))
                            }
                        </div>
                    </>
                )
            }




        </section >
    )
}
