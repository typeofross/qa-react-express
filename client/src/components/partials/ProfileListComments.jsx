import { NavLink, useNavigate } from 'react-router';

const styles = {
  div1: "cursor-pointer text-md mb-1 shadow-sm bg-white rounded-lg p-3 hover:shadow-lg hover:bg-stone-50 border-1 border-stone-200 m-2 text-stone-700",
  div2: "md:grid grid-cols-[1fr_auto] space-between gap-2",
  div3: "bg-stone-100 p-1 rounded-lg",
  span2: "text-slate-500 text-[12px] md:text-xs"
}

function ProfileListComments({ item }) {
  const navigate = useNavigate();

  const date = new Date(item.createdAt).toDateString();
  const time = new Date(item.createdAt).toLocaleTimeString();

  const redirectHandler = () => {
    navigate(`/post/${item.postId._id}`);
  }
  return (
    <>
      <div className={styles.div1} onClick={redirectHandler}>
        <div className={styles.div2}>
          <div>
            <span className={styles.span2}>◷ {date}, {time}</span>
          </div>
          <div>
            <span className={styles.span2}>{item.postId.title}</span>
          </div>
        </div>
        <div className={styles.div3}>
          {item.body}
        </div>
      </div >
    </>
  )
}

export default ProfileListComments
