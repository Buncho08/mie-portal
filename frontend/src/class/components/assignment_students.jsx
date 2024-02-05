import Cookies from 'js-cookie';
import { useContext, useEffect, useState } from 'react';
import { UserData } from '../../root/root';


export default function Assignment_students({ formatDate, assignment }) {

    // ドラッグアンドドロップで提出
    const hundleDropFile = (e) => {
        e.preventDefault();

        // MdNさんから拝借
        if (e.dataTransfer.items) {
            // DataTransferItemList インターフェイスを使用して、ファイルにアクセスする
            [...e.dataTransfer.items].forEach((item, i) => {
                // ドロップしたものがファイルでない場合は拒否する
                if (item.kind === "file") {
                    const file = item.getAsFile();
                    console.log(`… file[${i}].name = ${file.name}`);
                }
            });
        } else {
            // DataTransfer インターフェイスを使用してファイルにアクセスする
            [...e.dataTransfer.files].forEach((file, i) => {
                console.log(`… file[${i}].name = ${file.name}`);
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

            <div className="bg-white p-2 grid grid-cols-3 " onDrop={hundleDropFile} onDragOver={hundleDragOver}>
                {
                    assignment.length > 0
                        ? (<>
                            {
                                assignment.map((data) => (
                                    <div key={data.ast_id} className='col-span-1 border-4 h-40'>
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


        </section>
    )
}