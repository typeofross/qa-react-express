import React from 'react';
import { NavLink } from 'react-router';
import SearchInputField from './SearchInputField.jsx';
import config from '/config.js';

function Header() {

  const isLogged = config.getCookie();
  const classValue = `text-sm md:text-lg p-2 border-2 rounded-sm border-green-700 text-green-700 font-medium hover:bg-green-700 hover:text-white`;

  return (
    <>    <nav className="grid grid-cols-[1fr_1fr]">
      <div className="justify-self-start self-center">
        <NavLink to='/' className="font-bold"><img src="/src/assets/img/logo.png" className="h-15" /></NavLink>
      </div>
      <div className="justify-self-end self-center">
        {isLogged ?
          <NavLink to='/create' className={classValue}>CREATE POST</NavLink> :
          <NavLink to='/login' className={classValue}>LOGIN </NavLink>}
      </div>
    </nav>

      <div className="sm:w-[350px] mt-5">
        <SearchInputField />
      </div>
    </>
  );
}

export default Header;