export default function TimeTable({ timetable, classes, hundleUpdateTable, time_grade }) {
    const daydate = ['月', '火', '水', '木', '金'];

    return (
        <table className="border border-black border-separate">
            <thead>
                <tr>
                    <th>

                    </th>
                    {daydate.map((data, index) => (
                        <th key={index * 13}>
                            {data}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {
                    timetable.map((day, ddx) => {
                        return (
                            <tr key={ddx}>
                                <td>

                                </td>
                                {day.map((time, tdx) => (
                                    <td key={tdx * 23}>
                                        <form>
                                            <select
                                                onChange={
                                                    (e) => hundleUpdateTable(
                                                        e,
                                                        tdx,
                                                        ddx,
                                                        time_grade
                                                    )}
                                                name="time_class"
                                                defaultValue={time.time_classes_id ? time.time_classes_id.class_id : 'blank'}
                                            >
                                                {classes.map((data, index) => (
                                                    <option key={index * 3} value={data.class_id}>
                                                        {data.class_name}
                                                    </option>
                                                ))}
                                                <option value="blank">
                                                    -
                                                </option>
                                            </select>
                                        </form>
                                    </td>
                                ))}
                            </tr>
                        )
                    })
                }

            </tbody>
        </table>
    )
}