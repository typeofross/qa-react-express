import { NavLink, useNavigate } from 'react-router';
import CommentsRating from './ListItemsCommentsRating.jsx';
import { useState } from 'react';

const styles = {
  div1: "relative cursor-pointer text-md mb-1 shadow-sm bg-stone-100 rounded-lg p-3 hover:shadow-lg hover:bg-emerald-200 border-1 border-stone-200 m-2 text-stone-700",
  div2: "grid grid-cols-[auto_auto] ",
  div3: "justify-self-start",
  div4: "justify-self-end",
  div5: "absolute text-center w-[95%]",
  navLink: "ml-2 p-2 rounded-lg text-sm"
}

function ProfileListPosts(
  {
    item,
    deleteHandler
  }) {

  const navigate = useNavigate();
  const [menu, toggleMenu] = useState(false);
  const [confirm, toggleConfirm] = useState(false);

  return (
    <>
      <div className={styles.div1} onClick={() => toggleMenu(menu => !menu)}>
        <div className={styles.div2}>
          <div className={styles.div3} >
            <span className={menu || confirm ? "blur-xs" : ""}>{item.title}</span>
          </div>
          <div className={`${styles.div4} ${menu || confirm ? "blur-xs" : ""}`} >
            <CommentsRating item={item} />
          </div>
          {menu && !confirm &&
            <div className={styles.div5}>
              <NavLink to={`/post/${item._id}`} className={`${styles.navLink} bg-white border-1 border-gray-200`}>⛶ OPEN</NavLink>
              <NavLink to={`/update/${item._id}`} className={`${styles.navLink} bg-blue-100`}>🖉 UPDATE</NavLink>
              <NavLink onClick={() => toggleConfirm(confirm => !confirm)} className={`${styles.navLink} bg-rose-100`}>🞬 DELETE</NavLink>
            </div>
          }
          {!menu && confirm &&
            <div className={styles.div5}>
              <NavLink onClick={() => deleteHandler(item._id)} className={`${styles.navLink} bg-rose-100`}>CONFIRM</NavLink>
              <NavLink onClick={() => toggleConfirm(confirm => !confirm)} className={`${styles.navLink} bg-blue-100`}>CANCEL</NavLink>
            </div>

          }
        </div>
      </div >
    </>
  )
}

export default ProfileListPosts
