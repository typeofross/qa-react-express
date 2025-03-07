import { NavLink } from 'react-router';
import config from '/config.js';

function Footer() {

  const styles = {
    div1: "grid grid-cols-[200px_auto] pt-5 pb-5 text-sm tracking-wider",
    div2: "justify-self-end font-medium",
    navLink1: "text-xs md:text-md p-2 border-3 rounded-md tracking-widest border-red-200 bg-red-200 text-red-700 hover:bg-red-500 hover:border-red-500 hover:text-white",
  }
  const isLogged = config.getCookie();

  return (
    <>
      <div className={styles.div1}>
        <div>
          <h1>CREATED @ 2025</h1>

        </div>
        <div className={styles.div2}>
          {isLogged && <NavLink to='/logout' className={styles.navLink1}>LOGOUT</NavLink>}
        </div>
      </div>
    </>
  )
}

export default Footer
