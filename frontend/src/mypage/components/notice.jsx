import { UserData } from '../../root/root';
import { useContext } from "react";

export default function Notice() {
    const userdata = useContext(UserData);
    return (
        <section>
            <div className="bg-slate-400 p-2">
                <h3 className="text-lg">
                    おしらせ
                </h3>
            </div>
            <ul>
                
                {userdata.user_notice.map((data) => (

                    <li key={data.notice_id} className='flex'>
                        <p>{data.notice_date}</p>
                        <p>{data.notice_main}</p>
                        <p>{data.notice_classes}</p>
                    </li>

                ))}
            </ul>
        </section>
    )
}