import { UserData } from '../../root/root';
import { Fragment, useContext } from "react";
import { Link } from 'react-router-dom';
import SubTitleBar from '../../public-components/SubTitleBar';

export default function Notice({ user_notice }) {
    const replaceNotice = (markdownText) => {
        // Markdownを全部けす関数！
        // ![text]を消す
        markdownText = markdownText.replace(/!\[.+?\]/g, '');
        markdownText = markdownText.replace(/\*/g, '');
        markdownText = markdownText.replace(/\#*/g, '');
        markdownText = markdownText.replace(/\~/g, '');
        markdownText = markdownText.replace(/\`/g, '');
        markdownText = markdownText.replace(/\:/g, '');
        markdownText = markdownText.replace(/^\>/g, '');
        markdownText = markdownText.replace(/\<\/blockquote\>/g, '');
        markdownText = markdownText.replace(/\<blockquote\>/g, '');
        markdownText = markdownText.replace(/^\<img.*/g, '');
        return markdownText;

    }
    return (
        <section>
            <SubTitleBar title={'おしらせ'} />
            <table className="mx-side w-3/6 text-left">
                <thead className="border-b border-gray-200 ">
                    <tr>
                        <td>
                            更新日
                        </td>
                        <td>
                            本文
                        </td>
                        <td>
                            授業
                        </td>
                    </tr>
                </thead>
                {user_notice.length > 0
                    ? (
                        <tbody>
                            {user_notice.map((data) => (
                                <Fragment key={data.notice_id}>
                                    {
                                        data.notice_main !== "" && (< tr key={data.notice_id} className='hover:text-banner' >
                                            <td className='self-end font-semibold py-2'>
                                                <Link
                                                    className='block'
                                                    to={`http://localhost:3000/mie/class/${data.notice_classes.class_id}`}>
                                                    {data.notice_date}
                                                </Link>
                                            </td>
                                            <td>
                                                <Link
                                                    className='block'
                                                    to={`http://localhost:3000/mie/class/${data.notice_classes.class_id}`}>
                                                    {String(data.notice_main).length > 20 ? (`${replaceNotice(String(data.notice_main)).slice(0, 20)}....`) : (replaceNotice(data.notice_main))}
                                                </Link>
                                            </td>
                                            <td className="self-end">
                                                <Link
                                                    className='block'
                                                    to={`http://localhost:3000/mie/class/${data.notice_classes.class_id}`}>
                                                    {data.notice_classes.class_name}
                                                </Link>
                                            </td>
                                        </tr>
                                        )
                                    }
                                </Fragment>
                            ))}
                        </tbody>
                    )
                    : (
                        <li>
                            現在新着のお知らせはありません。
                        </li>
                    )
                }

            </table>
        </section >
    )
}