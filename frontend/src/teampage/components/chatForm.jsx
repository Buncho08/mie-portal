export default function ChatForm({ hundleSendMessage }) {
    return (
        <div className="h-[12%] bg-slate-400 py-3">
            <form onSubmit={hundleSendMessage} className="flex justify-center">
                <input type="text" name="message" id="message" className="w-3/5 rounded-md my-2" />
                <button type="submit" className="bg-banner m-2 h-10 w-16 text-base rounded-xl hover:bg-tahiti hover:text-white">
                    送信
                </button>
            </form>
        </div>
    )
}