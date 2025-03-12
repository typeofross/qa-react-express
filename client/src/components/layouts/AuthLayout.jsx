import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import config from '/config.js';

export const styles = {
    main: "mt-[30px] h-[90vh]",
    form: "max-w-xl mx-auto p-8 bg-white rounded-lg mt-15 border-1 border-gray-200 text-gray-700 shadow-lg",
    h2: "text-2xl font-semibold mb-4",
    label: "block text-gray-700 text-sm font-bold mb-2",
    input: "border rounded w-full py-2 px-3 text-gray-700 border-1 border-gray-300 rounded-lg",
    p1: "text-red-700 text-sm mt-1 mb-5",
    p2: "text-center mt-3",
    button: "cursor-pointer w-full text-xs md:text-md p-2 border-3 rounded-lg border-emerald-200 text-emerald-700 font-medium bg-emerald-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white",
    navLink: "underline text-indigo-600",
    navLink2: "block p-2 border-1 border-gray-200 rounded-lg mb-5 w-fit text-xs hover:bg-stone-100 cursor-pointer"
}

function AuthLayout() {
    const navigate = useNavigate();
    const isLogged = config.getCookie();

    useEffect(() => {
        if (isLogged) {
            return navigate('/');
        }
    }, [])

    return (
        <>
            <main className={styles.main}>
                <Outlet />
            </main>
        </>

    );
}

export default AuthLayout;