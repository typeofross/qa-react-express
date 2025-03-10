import { useNavigate } from 'react-router';

const styles = {
  div1: "cursor-pointer text-md mb-1 shadow-sm bg-stone-100 rounded-lg p-3 hover:shadow-lg hover:bg-stone-50 border-1 border-stone-200 m-2 text-stone-700",
}

function ProfileListRated({ item }) {
  const navigate = useNavigate();

  const redirectHandler = () => {
    navigate(`/post/${item._id}`);
  }

  return (
    <>
      <div className={styles.div1} onClick={redirectHandler}>
        {item.title} {item.isLiked ?
          <span className="text-emerald-500">▲</span>
          :
          <span className="text-rose-500">▼</span>
        }
      </div>
    </>
  )
}

export default ProfileListRated
