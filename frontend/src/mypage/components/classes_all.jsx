import { useContext } from "react";
import { UserData } from '../../root/root';

export default function Classes_all(params) {
    const user = useContext(UserData);
    const user_classes = user.user_classes;

    console.log(user_classes[0].class_teacher);
    let i = 1;
    return (

        <section className="grid grid-cols-6 gap-2">
            <>{
                user_classes.map((data) => (
                    <div key={data.class_id} className="col-span-1 bg-metal h-44">
                        <p>
                            {i++}時間目
                        </p>
                        <p>
                            {data.class_name}
                        </p>
                        <p>
                            担当 {`${data.class_teacher.user_last} ${data.class_teacher.user_first}`} 先生
                        </p>
                    </div>
                ))
            }
            </>
            <>
                {
                    Array(6 - user_classes.length).fill('').map((data, i) => (
                        < div key={1000 - i} className="col-span-1 bg-metal" >
                            <p>
                                aaaaaaaa
                            </p>
                        </div>
                    ))
                }
            </>
        </section >

    )
}