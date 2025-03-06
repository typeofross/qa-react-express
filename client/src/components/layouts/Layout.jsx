import React from 'react';
import Header from '/src/components/partials/Header';
import Footer from '/src/components/partials/Footer';
import { Outlet } from 'react-router';

function Layout() {
    return (
        <>
            <Header />
            <main className="mt-[30px] overflow-y-auto custom-scrollbar h-[87%] bg-white rounded-lg p-2">
                <Outlet />
            </main>
            <Footer />
        </>

    );
}

export default Layout;