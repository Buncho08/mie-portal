import { formatDate } from '../../public-components/utils/utils';

export default function SubmissionsArea({ data }) {
    return (
        <div className="col-span-1 border-4 grid rounded-lg p-3 h-20"
        >
            <p className='text-lg text-tahiti font-semibold'>
                {data.ast_title}
            </p>
            <p className='self-end ml-auto text-gray-600'>
                期限 : {formatDate(data.ast_limit)}
            </p>
        </div>
    )
}