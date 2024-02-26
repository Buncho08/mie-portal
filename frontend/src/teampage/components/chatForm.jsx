export default function ChatForm({ hundleSendMessage }) {
    return (
        <div className="h-[12%] bg-white border-t border-gray-500 py-3 shadow-[inset_0px_-10px_9px_1px_rgba(88,114,168,0.18)]">
            <form onSubmit={hundleSendMessage} className="flex justify-center h-full items-center">
                <input type="text" placeholder="メッセージ" name="message" id="message" className="outline-slate-500 border-2 h-[70%] border-gray-400 w-3/5 rounded-md my-2" />
                <button type='submit'
                    className="relative inline-flex items-center justify-center w-20 h-[80%] p-2 px-6 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-[0.5px] border-banner rounded-xl mx-4 shadow-lg group">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-gradient-to-br from-sky-500 via-banner to-sky-500 group-hover:translate-x-0 ease">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-banner transition-all duration-300 transform group-hover:translate-x-full ease">
                        送信
                    </span>
                    <span className="relative invisible">送信</span>
                </button>
            </form>
        </div>
    )
}