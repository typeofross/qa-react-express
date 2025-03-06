import React from 'react';
import { NavLink } from 'react-router';
import SearchInputField from './SearchInputField.jsx';
import config from '/config.js';

function Header() {

  const isLogged = config.getCookie();

  const styles = {
    nav: "grid grid-cols-[auto_1fr_auto] gap-5 sticky top-0",
    div1: "justify-self-start self-center",
    div2: "justify-self-end self-center",
    div3: "sm:w-[450px] mt-1 sm:justify-self-end",
    span: "hidden text-sm md:inline cursor-pointer text-gray-500 ml-3",
    navLink1: "text-xs md:text-md p-2 border-3 rounded-md tracking-widest border-emerald-200 text-emerald-700 font-medium bg-emerald-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white",
    navLink2: "border-red-200 bg-red-200 text-red-700 hover:bg-red-500 hover:border-red-500 hover:text-white",
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.div1}>
          <NavLink to='/' className="font-bold"><img src="/src/assets/img/logo.png" className="h-10 inline" /></NavLink>
          <span className={styles.span}>QUESTIONS</span>
        </div>
        <div className={styles.div3}>
          <SearchInputField />
        </div>
        <div className={styles.div2}>
          {isLogged ?
            <NavLink to='/logout' className={`${styles.navLink1} ${styles.navLink2}`}>LOGOUT</NavLink> :
            <NavLink to='/login' className={styles.navLink1}>LOGIN </NavLink>}
        </div>
      </nav>
    </>
  );
}

export default Header;