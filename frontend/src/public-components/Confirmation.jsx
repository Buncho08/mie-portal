import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons'

export default function Confirmation({ dofunc, target, setFlg }) {
    return (
        <div className="bg-cover-gray absolute h-full w-full top-0 left-0 z-20">
            <div role="alert" className="top-0 bottom-0 left-0 right-0 m-auto w-96 h-36 absolute rounded-xl border border-gray-100 bg-white p-4">
                <div className="ml-5 flex items-start gap-4">
                    <span className="text-error">
                        <FontAwesomeIcon icon={faTriangleExclamation} />
                    </span>
                    <div className="flex-1">
                        <strong className="block font-medium text-gray-900">
                            {target.target}を削除します
                        </strong>
                        <p className="mt-1 text-sm text-gray-700">
                            {target.target}を削除してもいいですか？
                        </p>
                        <div className="mt-4 flex gap-2">
                            <button
                                onClick={(e) => dofunc(e)}
                                className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700"
                            >
                                <span className="text-sm">
                                    削除
                                </span>
                            </button>
                            <button
                                onClick={() => setFlg(false)}
                                className="block rounded-lg px-4 py-2 text-gray-700 transition hover:bg-gray-50">
                                <span className="text-sm">
                                    キャンセル
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}