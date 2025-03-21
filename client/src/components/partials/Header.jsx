import React, { useContext, useState } from 'react';
import { NavLink } from 'react-router';
import SearchInputField from '/src/components/partials/SearchInputField.jsx';
import config from '/config.js';
import { AuthContext } from '/src/contexts/AuthContext';

function Header() {
  const { auth } = useContext(AuthContext);
  const [menu, toggleMenu] = useState(false);

  const isLogged = config.getCookie();

  const styles = {
    nav: "grid grid-cols-[50px_1fr_150px] md:grid-cols-[125px_1fr_150px] gap-5 sticky top-0 bg-sky-50 md:bg-inherit p-2 md:p-0",
    div1: "justify-self-start self-center",
    div2: "justify-self-end self-center",
    div3: "sm:w-[450px] mt-1 sm:justify-self-end",
    div4: "ml-3 inline-block grid text-center pt-1 text-lg font-semibold uppercase w-10 h-10 rounded-full bg-emerald-200 cursor-pointer hover:bg-emerald-300",
    div5: "z-9 border-1 border-gray-200 rounded-lg shadow-lg mt-3 ml-[-1%] absolute w-[150px] z-1 bg-white",
    span: "hidden text-sm md:inline cursor-pointer text-gray-500 ml-3",
    navLink1: "text-xs md:text-md p-2 border-3 rounded-md tracking-widest border-emerald-200 text-emerald-700 font-medium bg-emerald-200 hover:bg-emerald-500 hover:border-emerald-500 hover:text-white",
    navLink2: "text-xs md:text-md p-2 border-3 rounded-md tracking-widest border-blue-200 bg-blue-200 text-blue-700 hover:bg-blue-500 hover:border-blue-500 hover:text-white",
    navLink3: "text-sm block p-1 hover:bg-slate-200",
    navLink4: "text-xs block p-1 hover:bg-slate-200 bg-gray-100 border-b-1 border-gray-200 rounded-t-lg"
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
            <>
              <NavLink to='/create' className={styles.navLink2}>+ CREATE</NavLink>
              <div className={styles.div4} onClick={() => toggleMenu(menu => !menu)}>
                ⋮
              </div>
              {menu &&
                <div className={styles.div5}>
                  {auth.isLogged && <NavLink to='#' className={styles.navLink4} onClick={() => toggleMenu(menu => !menu)}>Hi, {auth.email} !</NavLink>}
                  <NavLink to='/profile/activity/posts' className={styles.navLink3} onClick={() => toggleMenu(menu => !menu)}>MY ACTIVITY</NavLink>
                  <NavLink to='/profile/settings' className={styles.navLink3}>SETTINGS</NavLink>
                </div>
              }

            </> :
            <NavLink to='/login' className={styles.navLink1}>LOGIN </NavLink>
          }
        </div>
      </nav>
    </>
  );
}

export default Header;