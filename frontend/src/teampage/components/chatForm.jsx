export default function ChatForm({ hundleSendMessage }) {
    return (
        <div className="h-[12%] bg-white border-t border-black py-3">
            <form onSubmit={hundleSendMessage} className="flex justify-center">
                <input type="text" placeholder="メッセージ" name="message" id="message" className="border-2 border-gray-400 w-3/5 rounded-md my-2" />
                <button type="submit" className="bg-banner text-white m-2 h-10 w-16 text-base rounded-xl hover:bg-tahiti ">
                    送信
                </button>
            </form>
        </div>
    )
}