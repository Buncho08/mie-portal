import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default function LikeIcon({ like, hundleDeleteLike, hundleSetLike, user_grade, setTarget, setViewModal }) {
    return (
        <div key={like.like_id} className={`${like.conf_like ? ('animate-jump animate-once animate-ease-in border-4 border-banner border-dashed rounded-lg') : ('')} grid justify-center items-center relative my-2 py-[0.5rem] px-1 `}
            onClick={
                like.conf_like
                    ? (
                        (e) => hundleDeleteLike(e, like.conf_like.conf_id)
                    )
                    : (
                        (e) => hundleSetLike(e, like.like_id)
                    )
            }>
            {
                user_grade === 2 && (
                    <button
                        onClick={(e) => {
                            setTarget({
                                'target': like.like_name,
                                'target_data': like
                            });
                            setViewModal(true);
                        }}
                        className=" absolute inline-block -top-4 right-2 px-[9px] leading-none text-[19px] bg-white">
                        🗑️
                    </button>
                )
            }

            <span className={`${like.conf_like ? ('animate-wiggle animate-infinite rounded-lg ') : ('hidden')} z-20 absolute inline-block -bottom-3 right-2 px-[10px] leading-none text-[22px] bg-white text-error`}>
                <FontAwesomeIcon icon={faHeart} />
            </span>


            <img
                src={`${import.meta.env.VITE_BACKEND_URI}${like.like_icon}`}
                alt=""
                width={100} height={100}
                className={`${like.conf_like ? ('animate-jump animate-once animate-ease-in') : ('grayscale')}`} />
        </div>
    )
}