import { UserData } from '../../root/root';
import { useContext, useState, useCallback, useEffect, useMemo } from "react";
import Cookies from 'js-cookie';
import SubTitleBar from '../../public-components/SubTitleBar'
import SimpleMde from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import DOMPurify from "dompurify";
import { marked } from 'marked';

export default function Notice({ class_id, notice_main, setAlert }) {
    const userdata = useContext(UserData);
    const [prev, setPrev] = useState('');
    const [textVal, setTextVal] = useState(notice_main);
    const [simpleMdeInstance, setMdeInstance] = useState(null);
    const title = useMemo(() => {
        return <SubTitleBar title={'おしらせ'} />;
    }, []);
    const getMdeInstanceCallback = useCallback((simpleMde) => {
        console.log('aaa')
        setMdeInstance(simpleMde);
    }, []);
    useEffect(() => {
        if (simpleMdeInstance) {
            simpleMdeInstance.codemirror.display.scroller.style.minHeight = "100px";
            simpleMdeInstance.codemirror.display.sizer.style.minHeight = "100px";
            simpleMdeInstance.codemirror.display.wrapper.style.height = "150px";
        }
    }, [simpleMdeInstance]);
    const hundleUpdateNoticeForm = async (e) => {
        e.preventDefault();
        console.log(e.target.notice.value);
        if (e.target.notice.value === '') {
            setAlert({
                'message': 'メッセージを入力してください。',
                'disc': 'メッセージが入力されていません。',
                'status': 1
            })

            return <></>
        }
        const sendNotice = new FormData();
        sendNotice.append('notice_main', e.target.notice.value);
        await fetch(`http://localhost:8000/api/notice/${class_id}`, {
            method: "PATCH",
            body: sendNotice,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setAlert({
                    'message': 'お知らせを更新しました。',
                    'disc': '',
                    'status': 0
                })
            })
    }

    const hundleDeleteUpdate = async (e) => {
        e.preventDefault();
        const notice = document.getElementById('notice');
        notice.value = '';
        const sendNotice = new FormData();
        sendNotice.append('notice_main', '');
        await fetch(`http://localhost:8000/api/notice/${class_id}`, {
            method: "PATCH",
            body: sendNotice,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                setTextVal('');
                setAlert({
                    'message': 'お知らせを削除しました。',
                    'disc': '',
                    'status': 0
                });
            })
        return <></>
    }
    const onChange = (value) => {
        setTextVal(value);
        document.getElementById('notice').value = value;
    }
    const toolbar = [
        "bold",
        "italic",
        "heading",
        "|",
        "quote",
        "ordered-list",
        "link",
        "upload-image",
        "|",
        "preview",
        "fullscreen",
        "|",
        "undo",
        "redo"

    ];
    const uploadImage = async (file) => {
        const sendData = new FormData();
        sendData.append('notice_image', file, file.name);
        sendData.append('class_id', class_id);
        const imageUrl = await fetch('http://localhost:8000/api/notice/save', {
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
            .catch((err) => console.log(err));
        if (imageUrl.error) {
            setAlert({
                'message': 'アップロード出来ませんでした。',
                'disc': 'すでに同じファイル名が存在するか、ファイル形式に問題があります。.jpg、.png、.gif形式のファイルをアップロードしてください。',
                'status': 1
            });
            return false;
        }
        return imageUrl.image_url;
    }
    const imageUploadFunction = useCallback(async (file) => {
        const imgURL = await uploadImage(file);
        if (imgURL) {
            setTextVal((prev) => {
                const ret = prev + `<img style="width:45%" src='http://localhost:8000/api${imgURL}' alt='${file.name}' >`;
                document.getElementById('notice').value = ret;
                return ret;
            });

        }
    }, []);

    const anOptions = useMemo(() => {
        return {
            autofocus: false,
            spellChecker: false,
            toolbar: toolbar,
            imageUploadFunction
        };
    }, []);
    return (
        <section>
            {title}
            <div className="bg-white p-2 grid grid-cols-2 gap-4">
                {userdata.user_grade === 2
                    ? (
                        <>
                            {/* 教師は編集できる */}
                            <form onSubmit={hundleUpdateNoticeForm} className='mb-2'>
                                <div className=''>
                                    <div
                                        className="overflow-hidden w-full rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600"
                                    >
                                        <SimpleMde options={anOptions} getMdeInstance={getMdeInstanceCallback} value={textVal} onChange={onChange} />
                                        <textarea name="notice" id="notice" className='hidden' cols="30" rows="10"
                                        >
                                        </textarea>
                                        <div className="flex items-center justify-end gap-2 bg-white p-3">
                                            <button
                                                onClick={hundleDeleteUpdate}
                                                type="button"
                                                className="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                                            >
                                                Clear
                                            </button>

                                            <button
                                                type="submit"
                                                className="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                                            >
                                                編集
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div className='pr-10' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked.parse(textVal)) }}>
                            </div>
                        </>
                    )
                    : (
                        // 学生は表示するだけ
                        <div className='mx-side-side'>
                            {notice_main
                                ? (
                                    <div>
                                        <div className='ml-10' dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(marked(textVal)) }}></div>
                                    </div>
                                )
                                :
                                (
                                    <p>
                                        現在お知らせはありません。
                                    </p>
                                )
                            }
                        </div>
                    )
                }

            </div>
        </section>
    )
}