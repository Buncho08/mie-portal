import { UserData } from '../../root/root';
import { useContext } from "react";
import { Link } from 'react-router-dom';
import SubTitleBar from '../../public-components/SubTitleBar';

export default function Notice({ user_notice }) {

    return (
        <section>
            <SubTitleBar title={'おしらせ'} />
            <ul className='px-side'>
                {user_notice.length > 0
                    ? (
                        <>
                            {user_notice.map((data) => (
                                <Link key={data.notice_id} to={`http://localhost:3000/mie/class/${data.notice_classes.class_id}`}>
                                    <li className='flex'>

                                        <p>{data.notice_date}</p>
                                        <p>{String(data.notice_main).length > 20 ? (`${String(data.notice_main).slice(0, 20)}....`) : (data.notice_main)}</p>
                                        <p>{data.notice_classes.class_name}</p>

                                    </li>
                                </Link>
                            ))}
                        </>
                    )
                    : (
                        <li>
                            現在新着のお知らせはありません。
                        </li>
                    )
                }

            </ul>
        </section >
    )
}