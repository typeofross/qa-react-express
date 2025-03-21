import React from 'react';
import Header from '/src/components/partials/Header';
import Footer from '/src/components/partials/Footer';
import { Outlet } from 'react-router';

const styles = {
    main: "mt-[30px] overflow-y-auto custom-scrollbar bg-white rounded-lg shadow-sm"
}

function Layout() {
    return (
        <>
            <Header />
            <main className={styles.main}>
                <Outlet />
            </main>
            <Footer />
        </>

    );
}

export default Layout;