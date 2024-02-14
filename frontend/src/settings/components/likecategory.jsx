import { Fragment } from "react"

export default function LikeCategory({ showLikeCategory, category, hundleSetLike, hundleDeleteLike }) {

    return (
        < div className="grid grid-cols-6 gap-3">
            {showLikeCategory.map((data, index) => (
                <Fragment key={index}>
                    {
                        data.like_category == category && (
                            <div className="grid justify-center items-center"
                                onClick={
                                    data.conf_like
                                        ? (
                                            (e) => hundleDeleteLike(e, data.conf_like.conf_id)
                                        )
                                        : (
                                            (e) => hundleSetLike(e, data.like_id)
                                        )
                                }>
                                <img
                                    src={`http://localhost:8000/api${data.like_icon}`}
                                    alt=""
                                    width={100} height={100}
                                    className={`${data.conf_like ? ('') : ('grayscale')}`} />
                            </div>
                        )
                    }
                </Fragment>
            ))}
        </div>
    )
}