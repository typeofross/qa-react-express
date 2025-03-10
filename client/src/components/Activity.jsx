import { NavLink, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import services from '/services/fetch.js';
import config from '/config.js';
import ProfileListPosts from './partials/ProfileListPosts.jsx';
import ProfileListComments from './partials/ProfileListComments.jsx';
import ProfileListRated from './partials/ProfileListRated.jsx';

function Activity({ type }) {
    const navigate = useNavigate();
    const [data, setData] = useState('');
    const [refresh, triggerRefresh] = useState(false);

    useEffect(() => {
        if (!config.getCookie()) {
            return navigate('/');
        }

        get();

    }, [type, refresh])

    const get = async () => {
        try {
            const response = await services.get(type, "", "", { credentials: 'include' });

            if (response.status !== 'success') {
                throw new Error(response.message)
            }

            setData(response.message);

        } catch (err) {
            console.error(err)
        }
    }

    const deleteHandler = async (id) => {
        try {
            const response = await services.crud('deletePost', "", id, "DELETE");

            if (response.status !== 204) {
                throw new Error(response.message)
            }

            triggerRefresh(refresh => !refresh);

        } catch (err) {
            console.error(err)
        }
    }

    const styles = {
        div1: "grid grid-cols-[200px_auto]",
        div2: "justify-self-end",
        navLink: "block p-2 border-1 border-gray-200 rounded-lg m-2 w-fit text-xs hover:bg-stone-100",
        navLink2: "inline-block p-2 border-1 border-blue-200 rounded-lg m-2 ml-0 w-fit text-xs hover:bg-blue-200 bg-blue-100 text-blue-900",
        navLink3: "inline-block p-2 border-1 border-green-200 rounded-lg m-2 ml-0 w-fit text-xs hover:bg-green-200 bg-green-100 text-green-900"
    }

    if (!data) {
        return null;
    }

    return (
        <>
            <title>Activity</title>
            <div className={styles.div1}>
                <div>
                    <NavLink to='/' className={styles.navLink}>↵ BACK TO HOME</NavLink>
                </div>
                <div className={styles.div2}>
                    <NavLink to='/profile/activity/posts' className={({ isActive }) => isActive ? styles.navLink3 : styles.navLink2}>POSTS</NavLink>
                    <NavLink to='/profile/activity/comments' className={({ isActive }) => isActive ? styles.navLink3 : styles.navLink2}>COMMENTS</NavLink>
                    <NavLink to='/profile/activity/rated' className={({ isActive }) => isActive ? styles.navLink3 : styles.navLink2}>RATED</NavLink>
                </div>
            </div>

            <div className="mt-5 mb-5">
                {type == "profilePosts" &&
                    data.map(item =>
                        <ProfileListPosts
                            key={item._id}
                            item={item}
                            deleteHandler={deleteHandler}
                        />
                    )
                }

                {type == "profileComments" &&
                    data.map(item =>
                        <ProfileListComments
                            key={item._id}
                            item={item}
                        />
                    )
                }

                {type == "profileRatings" &&
                    data.map(item =>
                        <ProfileListRated
                            key={item._id}
                            item={item}
                        />
                    )
                }
            </div>
        </>
    )
}

export default Activity
