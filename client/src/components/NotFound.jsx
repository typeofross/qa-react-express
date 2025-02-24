import { NavLink } from "react-router";
function NotFound() {

    return (
        <>
            <title>Page not found.</title>

            <h1>Page not found.</h1>
            <NavLink to='/'>Back to home.</NavLink>

        </>
    )
}

export default NotFound
