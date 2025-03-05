import React from 'react';
import { NavLink } from 'react-router';
import SearchInputField from './SearchInputField.jsx';
import config from '/config.js';

function Header() {

  const isLogged = config.getCookie();

  const styles = {
    nav: "grid grid-cols-[1fr_1fr]",
    div1: "justify-self-start self-center",
    div2: "justify-self-end self-center",
    div3: "sm:w-[350px] mt-5",
    navLink1: "text-sm md:text-lg p-2 border-2 rounded-sm border-green-700 text-green-700 font-medium hover:bg-green-700 hover:text-white",
    navLink2: "ml-3 border-red-700  bg-red-700 text-white hover:bg-red-800",
  }

  return (
    <>    <nav className={styles.nav}>
      <div className={styles.div1}>
        <NavLink to='/' className="font-bold"><img src="/src/assets/img/logo.png" className="h-15" /></NavLink>
      </div>
      <div className={styles.div2}>
        {isLogged ?
          <><NavLink to='/create' className={styles.navLink1}>CREATE POST</NavLink>
            <NavLink to='/logout' className={`${styles.navLink1} ${styles.navLink2}`}>LOGOUT</NavLink></> :
          <NavLink to='/login' className={styles.navLink1}>LOGIN </NavLink>}
      </div>
    </nav>

      <div className={styles.div3}>
        <SearchInputField />
      </div>
    </>
  );
}

export default Header;