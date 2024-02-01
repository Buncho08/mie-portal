
export default function banner() {
    return (
        <header className="bg-banner grid grid-cols-3 px-10 h-16 items-center w-full z-10">
            <h1 className="col-span-2 text-3xl text-accent">
                MIEPORTAL
            </h1>
            <nav>
                <ul className="flex justify-around">
                    <li className="bg-side-gray w-48 h-10 flex justify-center items-center text-lg">
                        ダミー
                    </li>
                    <li className="bg-side-gray w-48 h-10 flex justify-center items-center text-lg">
                        ダミー
                    </li>
                </ul>
            </nav>
        </header>
    )
}