import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router';
import config from '/config.js';

const styles = {
    main: "mt-[30px] h-[90vh]"
}

function UserLayout() {
    const navigate = useNavigate();
    const isLogged = config.getCookie();

    useEffect(() => {
        if (!isLogged) {
            return navigate('/login');
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

export default UserLayout;