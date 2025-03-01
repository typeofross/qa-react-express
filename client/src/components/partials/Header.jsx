import React, { useState } from 'react';
import { NavLink } from 'react-router';

function Header() {
  const [isMenuOpened, toggleMenu] = useState(false);

  const toggleMobileMenu = () => {
    toggleMenu(!isMenuOpened);
  };

  return (
    <nav className="md:mt-[30px]">
      <div className="flex justify-between items-center">

        <div className="font-bold">Q&A</div>

        {/* Desktop Links */}
        <div className="hidden md:flex space-x-4">
          <NavLink to='/'>HOME</NavLink>
          <NavLink to='/login'>LOGIN</NavLink>
          <NavLink to='/register'>REGISTER</NavLink>
        </div>

        {/* Mobile Menu Button (Hidden on Desktop) */}
        <div className="md:hidden">
          <button onClick={toggleMobileMenu} className="text-gray-300 focus:outline-none">
            <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (Hidden on Desktop) */}
      <div className={`${isMenuOpened ? 'block' : 'hidden'} md:hidden mt-2`}>
        {/* Links for mobile should be here. */}
      </div>
    </nav>
  );
}

export default Header;