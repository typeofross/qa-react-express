import React from 'react';
import { NavLink, Outlet } from 'react-router';

function AuthLayout() {
    return (
        <>
            <main className="mt-[30px]">
                <div className="flex justify-between items-center mb-[30px]">
                    <div>
                        <NavLink to='/'>↵ BACK TO HOME</NavLink>
                    </div>
                    <div>

                    </div>
                </div>
                <Outlet />
            </main>
        </>

    );
}

export default AuthLayout;