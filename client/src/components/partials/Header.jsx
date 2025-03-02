import React, { useState } from 'react';
import { NavLink } from 'react-router';

function Header() {
  return (
    <nav className="grid grid-cols-[1fr_1fr]">
      <div className="justify-self-start self-center">
        <NavLink to='/' className="font-bold"><img src="/src/assets/img/logo.png" className="h-15" /></NavLink>
      </div>
      <div className="justify-self-end self-center">
        <NavLink to='/login' className="text-sm md:text-lg p-2 border-2 rounded-sm border-green-700 text-green-700 font-medium hover:bg-green-700 hover:text-white">CREATE POST</NavLink>
      </div>
    </nav>
  );
}

export default Header;