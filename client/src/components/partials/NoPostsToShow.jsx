import { NavLink } from 'react-router';

const styles = {
    div: "text-center pt-70 h-[80vh] md:h-0",
    p: "pb-5",
    navLink: "p-3 border-1 border-blue-100 bg-blue-50 rounded-lg"
}

function NoPostsToShow() {

    return (
        <>
            <div className={styles.div}>
                <p className={styles.p}>No posts to show.</p>
                <NavLink className={styles.navLink} to='/create'>Create one now!</NavLink>
            </div>
        </>
    )
}

export default NoPostsToShow
