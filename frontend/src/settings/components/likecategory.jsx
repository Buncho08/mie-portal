import { Fragment, useState } from "react"
import SectionTitleBar from "../../public-components/SectionTitleBar";
import Cookies from 'js-cookie';
import AddLikeCategory from "./AddLikeCategoty";
import Alert from '../../public-components/Alert';
import Confirmation from "../../public-components/Confirmation";

export default function LikeCategory({ likecategory, userdata }) {
    const category = ['ゲーム', '趣味', 'プログラミング', 'いきもの'];
    const [showLikeCategory, setShowLikeCategory] = useState(likecategory);
    const [showCategory, setShowCategory] = useState(0);
    const [showAddLikeModal, setShowAddLikeModal] = useState(false);
    const [target, setTarget] = useState({
        'target': '',
        'target_data': {}
    });
    const [viewModal, setViewModal] = useState(false);
    const [alert, setAlert] = useState({
        'message': '',
        'disc': '',
        'status': 0
    });
    const hundleSetLike = async (e, like_id) => {
        const sendData = new FormData();
        sendData.append('like_id', like_id);
        sendData.append('user_id', userdata.user_id);
        const status = await fetch(`http://localhost:8000/api/settings/like/set`, {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",

        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        setShowLikeCategory(
            showLikeCategory.map((data) => (
                data.map((item) => {
                    if (item.like_id === like_id) {
                        item.conf_like = status;
                    }

                    return item;
                })
            )));
        return 0;
    }

    const hundleDeleteLike = async (e, conf_id) => {
        const status = await fetch(`http://localhost:8000/api/settings/like/delete/${conf_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",

        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err))

        setShowLikeCategory(showLikeCategory.map((data) => (
            data.map((item) => {
                if (item.conf_like && item.conf_like.conf_id === conf_id) {
                    item.conf_like = null;
                }
                return item;
            })
        )));
    }

    const hundleCreateCategory = async (e) => {
        e.preventDefault();
        const sendData = new FormData();
        sendData.append('like_category', showCategory);
        sendData.append('like_name', e.target.like_name.value);
        sendData.append('like_icon', e.target.like_icon.files[0]);
        const status = await fetch('http://localhost:8000/api/likecategory', {
            method: 'POST',
            body: sendData,
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => data)
            .catch((err) => console.log(err));

        if (status.error) {
            console.log(status);
            setAlert({
                'message': status.error.like_name[0],
                'disc': '',
                'status': 1
            });
            return 0
        }
        setShowLikeCategory(showLikeCategory.map((data, index) => {
            if (index == showCategory) {
                return (
                    [...data, status]
                )
            }
            else {
                return data
            }
        })
        );
        setShowAddLikeModal({
            'target': '',
            'target_data': {}
        });
        setShowAddLikeModal(false);
        setAlert({
            'message': '好きなものカテゴリを追加しました',
            'disc': 'クリックして好きなものを設定してみましょう✨',
            'status': 0
        })
        return <></>
    }

    const hundleDeleteCategory = async (e) => {
        e.preventDefault();
        const status = await fetch(`http://localhost:8000/api/likecategory/delete/${target.target_data.like_id}`, {
            method: 'DELETE',
            headers: {
                'X-CSRFToken': `${Cookies.get('csrftoken')}`,
            },
            credentials: "include",
            mode: "cors",
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log(data);
                }
                console.log(data);

            })
            .catch((err) => console.log(err));

        setShowLikeCategory(showLikeCategory.map((data) => (
            data.filter((item) => (item.like_id !== target.target_data.like_id))
        )));
        setViewModal(false);
        setAlert({
            'message': 'カテゴリを削除しました',
            'disc': '',
            'status': 0
        });
        return <></>
    }
    return (
        <Fragment>
            {
                showAddLikeModal
                && (
                    <div className="bg-cover-gray absolute h-full w-full top-0 left-0 z-30">
                        <AddLikeCategory showAddLikeModal={showAddLikeModal} likecategory={category[showCategory]} setShowAddLikeModal={setShowAddLikeModal} hundleCreateCategory={hundleCreateCategory} />
                    </div>
                )
            }
            {
                alert.message !== '' && (
                    <Alert alert={alert} setAlert={setAlert} />
                )
            }
            {
                viewModal &&
                <Confirmation target={target} dofunc={hundleDeleteCategory} setFlg={setViewModal} />
            }
            <div className="flex justify-around items-center">
                {category.map((data, index) => (
                    <button
                        className={`
                            border-midnight border-solid border-2 rounded-lg h-10 w-48 my-2  
                            ${showCategory == index ? ('bg-bermuda') : ('bg-white hover:bg-metal hover:text-white')}
                            `}
                        key={index * 10}
                        onClick={() => {
                            setShowCategory(index)
                            console.log(index);
                        }}
                    >
                        {data}
                    </button>
                ))}
            </div>
            {
                category.map((data, ctdx) => (
                    <Fragment key={ctdx * 100}>
                        <div key={ctdx * 100} className={`${showCategory == ctdx ? ('') : ('hidden')}`}>
                            <SectionTitleBar title={data} />
                        </div>
                    </Fragment>
                ))
            }

            < div className="grid grid-cols-6 gap-3">
                {showLikeCategory[showCategory].map((like, likedx) => (
                    <div key={like.like_id} className={`grid justify-center items-center ${userdata.user_grade === 2 && ('relative')}`}
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
                            userdata.user_grade === 2 && (
                                <button
                                    onClick={(e) => {
                                        setTarget({
                                            'target': like.like_name,
                                            'target_data': like
                                        });
                                        setViewModal(true);
                                    }}
                                    className="absolute right-12 m-1 bg-white rounded-md z-10 top-0">
                                    🗑️
                                </button>
                            )
                        }
                        <img
                            src={`http://localhost:8000/api${like.like_icon}`}
                            alt=""
                            width={100} height={100}
                            className={`${like.conf_like ? ('') : ('grayscale')}`} />
                    </div>
                ))}
                <div className="grid justify-center items-center">
                    <button
                        onClick={() => setShowAddLikeModal(true)}
                    >
                        <svg
                            className="hover:bg-gray-100 rounded-xl [&_path]:hover:fill-light-blue"
                            width="100"
                            height="100"
                            viewBox="0 0 132.29166 132.29167"
                            version="1.1"
                            id="svg1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:svg="http://www.w3.org/2000/svg">
                            <defs
                                id="defs1" />
                            <g
                                className="[&_path]:hover:fill-light-blue"
                                id="layer1">
                                <path
                                    d="m 22.412109,10.326172 c -0.529614,3.8e-4 -1.063408,0.03443 -1.595703,0.105469 a 1.1826251,1.1826251 0 0 0 -1.015625,1.328125 1.1826251,1.1826251 0 0 0 1.328125,1.015625 c 0.421084,-0.05619 0.851122,-0.08359 1.283203,-0.08399 h 0.002 9.458985 a 1.1826251,1.1826251 0 0 0 1.183594,-1.18164 1.1826251,1.1826251 0 0 0 -1.183594,-1.183594 z m 18.921875,0 a 1.1826251,1.1826251 0 0 0 -1.18164,1.183594 1.1826251,1.1826251 0 0 0 1.18164,1.18164 h 9.460938 a 1.1826251,1.1826251 0 0 0 1.183594,-1.18164 1.1826251,1.1826251 0 0 0 -1.183594,-1.183594 z m 18.921875,0 a 1.1826251,1.1826251 0 0 0 -1.18164,1.183594 1.1826251,1.1826251 0 0 0 1.18164,1.18164 h 9.460938 a 1.1826251,1.1826251 0 0 0 1.183594,-1.18164 1.1826251,1.1826251 0 0 0 -1.183594,-1.183594 z m 18.921875,0 a 1.1826251,1.1826251 0 0 0 -1.18164,1.183594 1.1826251,1.1826251 0 0 0 1.18164,1.18164 h 9.460938 a 1.1826251,1.1826251 0 0 0 1.183594,-1.18164 1.1826251,1.1826251 0 0 0 -1.183594,-1.183594 z m 18.921875,0 a 1.1826251,1.1826251 0 0 0 -1.18164,1.183594 1.1826251,1.1826251 0 0 0 1.18164,1.18164 h 9.462891 a 1.1826251,1.1826251 0 0 0 1.18164,-1.18164 1.1826251,1.1826251 0 0 0 -1.18164,-1.183594 z m 18.269531,2.259766 a 1.1826251,1.1826251 0 0 0 -0.7832,0.453125 1.1826251,1.1826251 0 0 0 0.2207,1.658203 c 1.19783,0.916668 2.17909,2.127437 2.83203,3.488281 l 0.002,0.002 c 0.56137,1.16643 0.88463,2.454894 0.94335,3.75 a 1.1826251,1.1826251 0 0 0 1.23438,1.126953 1.1826251,1.1826251 0 0 0 1.12695,-1.234375 c -0.0732,-1.614738 -0.47184,-3.209376 -1.17383,-4.667969 -0.81569,-1.700051 -2.03087,-3.197041 -3.52929,-4.34375 a 1.1826251,1.1826251 0 0 0 -0.87305,-0.232421 z M 12.984375,15.357422 a 1.1826251,1.1826251 0 0 0 -0.744141,0.515625 c -0.214091,0.332849 -0.41073,0.676938 -0.589843,1.027344 -0.872272,1.702501 -1.32135,3.603144 -1.31836,5.509765 v 3.234375 a 1.1826251,1.1826251 0 0 0 1.181641,1.181641 1.1826251,1.1826251 0 0 0 1.183594,-1.181641 v -3.236328 -0.002 c -0.0024,-1.531556 0.362319,-3.071221 1.058593,-4.429688 0.14455,-0.282786 0.302049,-0.558974 0.472657,-0.824218 A 1.1826251,1.1826251 0 0 0 13.875,15.519531 1.1826251,1.1826251 0 0 0 12.984375,15.357422 Z M 120.77734,30.162109 a 1.1826251,1.1826251 0 0 0 -1.18359,1.181641 v 9.460937 a 1.1826251,1.1826251 0 0 0 1.18359,1.183594 1.1826251,1.1826251 0 0 0 1.18164,-1.183594 V 31.34375 a 1.1826251,1.1826251 0 0 0 -1.18164,-1.181641 z M 11.513672,33.921875 a 1.1826251,1.1826251 0 0 0 -1.181641,1.183594 v 9.460937 a 1.1826251,1.1826251 0 0 0 1.181641,1.181641 1.1826251,1.1826251 0 0 0 1.183594,-1.181641 V 35.105469 A 1.1826251,1.1826251 0 0 0 11.513672,33.921875 Z M 120.77734,49.083984 a 1.1826251,1.1826251 0 0 0 -1.18359,1.181641 v 9.460937 a 1.1826251,1.1826251 0 0 0 1.18359,1.183594 1.1826251,1.1826251 0 0 0 1.18164,-1.183594 v -9.460937 a 1.1826251,1.1826251 0 0 0 -1.18164,-1.181641 z M 11.513672,52.84375 a 1.1826251,1.1826251 0 0 0 -1.181641,1.183594 v 9.460937 a 1.1826251,1.1826251 0 0 0 1.181641,1.181641 1.1826251,1.1826251 0 0 0 1.183594,-1.181641 V 54.027344 A 1.1826251,1.1826251 0 0 0 11.513672,52.84375 Z M 120.77734,68.005859 a 1.1826251,1.1826251 0 0 0 -1.18359,1.181641 v 9.460937 a 1.1826251,1.1826251 0 0 0 1.18359,1.183594 1.1826251,1.1826251 0 0 0 1.18164,-1.183594 V 69.1875 a 1.1826251,1.1826251 0 0 0 -1.18164,-1.181641 z M 11.513672,71.765625 a 1.1826251,1.1826251 0 0 0 -1.181641,1.183594 v 9.460937 a 1.1826251,1.1826251 0 0 0 1.181641,1.181641 1.1826251,1.1826251 0 0 0 1.183594,-1.181641 V 72.949219 A 1.1826251,1.1826251 0 0 0 11.513672,71.765625 Z M 120.77734,86.927734 a 1.1826251,1.1826251 0 0 0 -1.18359,1.181641 v 9.460937 a 1.1826251,1.1826251 0 0 0 1.18359,1.183594 1.1826251,1.1826251 0 0 0 1.18164,-1.183594 v -9.460937 a 1.1826251,1.1826251 0 0 0 -1.18164,-1.181641 z M 11.513672,90.6875 a 1.1826251,1.1826251 0 0 0 -1.181641,1.183594 v 9.460936 a 1.1826251,1.1826251 0 0 0 1.181641,1.18164 1.1826251,1.1826251 0 0 0 1.183594,-1.18164 V 91.871094 A 1.1826251,1.1826251 0 0 0 11.513672,90.6875 Z m 109.263668,15.16211 a 1.1826251,1.1826251 0 0 0 -1.18359,1.18164 v 2.84375 c 0.001,0.83801 -0.20391,1.70158 -0.5625,2.50977 -0.41592,0.93939 -1.02338,1.82064 -1.74219,2.6289 a 1.1826251,1.1826251 0 0 0 0.0977,1.66992 1.1826251,1.1826251 0 0 0 1.66992,-0.0977 c 0.84448,-0.94958 1.5979,-2.02522 2.13672,-3.24219 0.47453,-1.0695 0.76745,-2.24857 0.76562,-3.4707 v -2.8418 a 1.1826251,1.1826251 0 0 0 -1.18164,-1.18164 z m -109.320309,3.76367 a 1.1826251,1.1826251 0 0 0 -1.083984,1.27344 c 0.118387,1.46695 0.50889,2.90637 1.146484,4.23242 0.878793,1.83346 2.222068,3.4265 3.878907,4.60352 a 1.1826251,1.1826251 0 0 0 1.65039,-0.2793 1.1826251,1.1826251 0 0 0 -0.279297,-1.64844 c -1.325443,-0.94159 -2.414724,-2.23364 -3.117187,-3.69922 v -0.002 c -0.510739,-1.06222 -0.825138,-2.222 -0.919922,-3.39648 a 1.1826251,1.1826251 0 0 0 -1.275391,-1.08399 z m 98.646489,9.95703 c -0.0883,0.0127 -0.16461,0.0195 -0.22657,0.0195 h -9.06445 a 1.1826251,1.1826251 0 0 0 -1.183594,1.1836 1.1826251,1.1826251 0 0 0 1.183594,1.18164 h 9.06641 0.002 c 0.20092,-2.4e-4 0.38681,-0.0183 0.55859,-0.043 a 1.1826251,1.1826251 0 0 0 1.00196,-1.33789 1.1826251,1.1826251 0 0 0 -1.33789,-1.00391 z m -84.97852,0.0195 a 1.1826251,1.1826251 0 0 0 -1.183594,1.1836 1.1826251,1.1826251 0 0 0 1.183594,1.18164 h 9.460937 a 1.1826251,1.1826251 0 0 0 1.181641,-1.18164 1.1826251,1.1826251 0 0 0 -1.181641,-1.1836 z m 18.921875,0 a 1.1826251,1.1826251 0 0 0 -1.183594,1.1836 1.1826251,1.1826251 0 0 0 1.183594,1.18164 h 9.460937 a 1.1826251,1.1826251 0 0 0 1.181641,-1.18164 1.1826251,1.1826251 0 0 0 -1.181641,-1.1836 z m 18.921875,0 a 1.1826251,1.1826251 0 0 0 -1.183594,1.1836 1.1826251,1.1826251 0 0 0 1.183594,1.18164 h 9.460937 a 1.1826251,1.1826251 0 0 0 1.181641,-1.18164 1.1826251,1.1826251 0 0 0 -1.181641,-1.1836 z m 18.921875,0 a 1.1826251,1.1826251 0 0 0 -1.183594,1.1836 1.1826251,1.1826251 0 0 0 1.183594,1.18164 h 9.460937 a 1.1826251,1.1826251 0 0 0 1.181641,-1.18164 1.1826251,1.1826251 0 0 0 -1.181641,-1.1836 z"
                                    id="rect1" />
                                <path
                                    id="rect2"
                                    className="fill-gray-800"
                                    d="m 46.903661,62.647259 h 38.484345 c 1.722855,0 3.109846,1.386991 3.109846,3.109846 v 0.777461 c 0,1.722854 -1.386991,3.109846 -3.109846,3.109846 H 46.903661 c -1.722854,0 -3.109845,-1.386992 -3.109845,-3.109846 v -0.777461 c 0,-1.722855 1.386991,-3.109846 3.109845,-3.109846 z" />
                                <path
                                    id="rect3"
                                    transform="rotate(-90)"
                                    className="fill-gray-800 "
                                    d="m -85.388003,62.647259 h 38.484345 c 1.722855,0 3.109846,1.386991 3.109846,3.109846 v 0.777461 c 0,1.722854 -1.386991,3.109846 -3.109846,3.109846 h -38.484345 c -1.722854,0 -3.109846,-1.386992 -3.109846,-3.109846 v -0.777461 c 0,-1.722855 1.386992,-3.109846 3.109846,-3.109846 z" />
                            </g>
                        </svg>
                    </button>
                </div>
            </div>
        </Fragment>
    )
}