import React from 'react';
import { NavLink, Outlet } from 'react-router';

function AuthLayout() {
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