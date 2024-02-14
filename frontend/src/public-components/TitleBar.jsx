export default function TitleBar({ title }) {
    return (
        <div className="w-full px-4 pt-7 font-bold flex items-center">
            <h2 className="text-4xl">
                {title}
            </h2>
        </div>
    )
}