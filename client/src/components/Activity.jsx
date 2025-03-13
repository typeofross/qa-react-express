import { NavLink, useNavigate, useParams } from 'react-router';
import { useState } from 'react';
import services from '/services/fetch.js';
import config from '/config.js';
import ProfileListPosts from '/src/components/partials/ProfileListPosts.jsx';
import ProfileListComments from '/src/components/partials/ProfileListComments.jsx';
import ProfileListRated from '/src/components/partials/ProfileListRated.jsx';
import NoPostsToShow from '/src/components/partials/NoPostsToShow.jsx';
import ErrorToast from '/src/components/partials/ErrorToast.jsx';
import useRequest from '/src/hooks/useRequest';

function Activity() {
    const map = {
        "posts": "profilePosts",
        "comments": "profileComments",
        "rated": "profileRatings"
    }
    const type = map[useParams().type];
    const [refresh, triggerRefresh] = useState(false);

    const request = {
        "type": type,
        data: {
            cred: { credentials: 'include' }
        },
        state: refresh
    }

    const [response, content, error] = useRequest(request);
    const navigate = useNavigate();

    if (!config.getCookie()) {
        return navigate('/login');
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

            {!content && <NoPostsToShow />}

            {error && <ErrorToast error={error} />}

            <div className="mt-5 mb-5">
                {type == "profilePosts" && response.message &&
                    response.message.map(item =>
                        <ProfileListPosts
                            key={item._id}
                            item={item}
                            deleteHandler={deleteHandler}
                        />
                    )
                }

                {type == "profileComments" && response.message &&
                    response.message.map(item =>
                        <ProfileListComments
                            key={item._id}
                            item={item}
                        />
                    )
                }

                {type == "profileRatings" && response.message &&
                    response.message.map(item =>
                        <ProfileListRated
                            key={item._id}
                            item={item}
                        />
                    )}
            </div>

        </>
    )
}

export default Activity
