import Cookies from 'js-cookie';


export default function CreateClasses({ teachers, hundleSubmit }) {

    return (
        <>
            <form onSubmit={hundleSubmit}>
                <input type="text" name="class_name" id="class_name" />
                <label htmlFor="first">
                    <input type="radio" name="class_grade" id="first" value={0} />
                    1年生
                </label>
                <label htmlFor="second">
                    <input type="radio" name="class_grade" id="second" value={1} />
                    2年生
                </label>
                <br />
                <p>
                    担当教師
                </p>
                <select name="user_id" id="user_id" defaultValue={teachers[0].user_id}>
                    {teachers.map((data, index) => (
                        <option value={data.user_id} key={data.user_id}>
                            {data.user_last} {data.user_first}
                        </option>
                    ))}
                </select>
                <button type="submit">
                    作成
                </button>
            </form>
        </>
    )
}