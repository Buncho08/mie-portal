import Cookies from 'js-cookie';
import { Fragment } from 'react';
import { UserData } from '../../root/root';


export default function Assignment_students({ formatDate, assignment, setAssignment }) {

    const fetchSubmittion = async (ast_id, sendData) => {
        const res = await fetch(`http://localhost:8000/api/assignment/submition/${ast_id}`, {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    return false
                }
                else {
                    setAssignment(assignment.map((item) => (
                        item.ast_id === data.state_ast.ast_id
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
                }
            })
            .catch((err) => console.log(err))

    }
    // ドラッグアンドドロップで提出
    const hundleDropFile = async (e, ast_id) => {
        e.preventDefault();

        // MdNさんから拝借
        if (e.dataTransfer.items) {
            // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
            [...e.dataTransfer.items].forEach((item, i) => {
                // ドロップしたものがファイルでない場合は拒否する
                if (item.name == '') {
                    return false
                }
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    const sendData = new FormData();
                    sendData.append('assignment_file', file)
                    const status = fetchSubmittion(ast_id, sendData)
                }
            });
        }
        return <></>
    }
    // ドラッグ動作をOFF
    const hundleDragOver = (e) => {
        e.preventDefault();
    }
    return (
        <section>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    提出物
                </h3>
            </div>
            <div className="bg-slate-400 p-2">
                <h3 className="text-base">
                    未提出
                </h3>
            </div>
            <div className="bg-white p-2 grid grid-cols-3 ">
                {
                    assignment.length > 0
                        ? (<>
                            {
                                assignment.map((data) => (
                                    <Fragment key={data.ast_id}>
                                        {data.user_state
                                            ? <></>
                                            : (
                                                <div className={`col-span-1 border-4 h-40`}
                                                    onDrop={(e) => hundleDropFile(e, data.ast_id)} onDragOver={hundleDragOver}
                                                >
                                                    <p>
                                                        {data.ast_title}
                                                    </p>
                                                    <p>
                                                        {data.ast_disc}
                                                    </p>
                                                    <p>
                                                        期限 : {formatDate(data.ast_limit)}
                                                    </p>
                                                </div>
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
                assignment.length > 0
                    ? (
                        <>
                            <div className="bg-slate-400 p-2">
                                <h3 className="text-base">
                                    提出済
                                </h3>
                            </div>
                            <div className="bg-white p-2 grid grid-cols-3 ">

                                {
                                    assignment.map((data, index) => (
                                        <Fragment key={data.ast_id}>
                                            {data.user_state
                                                ? (
                                                    <div className={`col-span-1 border-4 h-40 bg-tahiti`}
                                                    >
                                                        <p>
                                                            {data.ast_title}
                                                        </p>
                                                        <p>
                                                            {data.ast_disc}
                                                        </p>
                                                        <p>
                                                            期限 : {formatDate(data.ast_limit)}
                                                        </p>
                                                    </div>
                                                )
                                                : <Fragment key={index * 1000}></Fragment>
                                            }
                                        </Fragment>
                                    ))
                                }
                            </div>
                        </>
                    )
                    : (
                        <>
                            <p>
                                提出済の課題はありません。
                            </p>
                        </>
                    )
            }




        </section>
    )
}
