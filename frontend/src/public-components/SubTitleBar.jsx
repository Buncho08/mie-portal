export default function SubTitleBar({ title }) {
    return (
        <div className="px-side py-yspace">
            <h3 className="text-2xl font-bold">
                {title}
            </h3>
            <div className="h-[0.1px] w-7/12 bg-midnight">

            </div>
        </div>
    )
}