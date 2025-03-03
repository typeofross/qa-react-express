import React, { useEffect } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router';
import config from '/config.js';

function UserLayout() {
    const navigate = useNavigate();
    const isLogged = config.getCookie();

    useEffect(() => {
        if (!isLogged) {
            // Only logged in users can visit.
            return navigate('/');
        }
    }, [])

    return (
        <>
            <main className="mt-[30px]">
                <Outlet />
            </main>
        </>

    );
}

export default UserLayout;