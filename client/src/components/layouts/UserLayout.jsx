import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import config from '/config.js';

function UserLayout() {
    const navigate = useNavigate();
    const isLogged = config.getCookie();

    useEffect(() => {
        if (!isLogged) {
            return navigate('/');
        }
    }, [])

    return (
        <>
            <main className="mt-[30px] h-[90vh]">
                <Outlet />
            </main>
        </>

    );
}

export default UserLayout;