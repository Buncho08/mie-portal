export default function Class({ classdata }) {
    return (
        <li className="flex">
            <p>
                {classdata.class_name}
            </p>
            <p>
                {classdata.class_teacher.user_last}先生
            </p>
            <button>
                🖋
            </button>
            <button>
                🗑️
            </button>
        </li>
    )
}