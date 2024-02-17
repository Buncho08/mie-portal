import { formatDate } from '../../public-components/utils/utils';

export function AssignmentArea({ data, hundleDropFile, hundleDragOver }) {
    return (
        <div className="col-span-1 border-4 grid rounded-lg p-3 h-32"
            onDrop={(e) => hundleDropFile(e, data.ast_id)} onDragOver={hundleDragOver}
        >
            <p className='text-lg font-semibold'>
                {data.ast_title}
            </p>
            <p>
                {data.ast_disc}
            </p>
            <p className='self-end ml-auto'>
                期限 : {formatDate(data.ast_limit)}
            </p>
        </div>
    )
}