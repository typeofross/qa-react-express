import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import config from '/config.js';

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
            <main className="mt-[30px]">
                <NavLink to='/'>↵ BACK TO HOME</NavLink>
                <Outlet />
            </main>
        </>

    );
}

export default AuthLayout;