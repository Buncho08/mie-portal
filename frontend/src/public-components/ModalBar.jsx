export default function ModalBar({ closeFlg, flg, title }) {
    return (
        <div className="bg-blue w-full h-[10%] flex justify-between items-center p-4">
            <p className="text-white">
                {title}
            </p>
            <button onClick={() => closeFlg(flg)} className="bg-white w-8 rounded-md inline-block h-8 text-2xl">
                <p>✕</p>
            </button>
        </div>
    )
}