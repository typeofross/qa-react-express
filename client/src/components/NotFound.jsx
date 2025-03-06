import { NavLink } from "react-router";
function NotFound() {

    return (
        <>
            <title>Page not found.</title>


            <div className="text-center text-gray-800 mt-[55%] md:mt-[35%] grid grid-cols-[200px_1fr] md:grid-cols-[300px_1fr] gap-2 md:gap-5">
                <div>
                </div>

                <div className="justify-self-end">
                    <NavLink to='/'>↵ BACK TO HOME</NavLink>
                </div>

                <div className="border-r-5 border-gray-300">

                    <h1 className="text-7xl md:text-9xl">404</h1>
                </div>
                <div className="text-lg md:text-2xl md:mt-[10%] text-center">
                    This page doesn't exist anymore.
                </div>
            </div>

        </>
    )
}

export default NotFound
