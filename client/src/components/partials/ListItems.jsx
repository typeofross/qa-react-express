import { useNavigate } from 'react-router';
import CommentsRating from './ListItemsCommentsRating.jsx';

const styles = {
  div1: "cursor-pointer mb-4",
  div2: "text-xs mb-0.5",
  div3: "hover:text-indigo-600 inline md:text-xl",
  span1: "p-1 border-1 border-gray-300 rounded-sm pl-2 pr-2",
  span2: "ml-1 p-1 border-1 border-gray-300 rounded-sm pl-2 pr-2"
}

function ListItems({ item }) {
  const navigate = useNavigate();
  const date = new Date(item.createdAt).toDateString();
  const time = new Date(item.createdAt).toLocaleTimeString();

  const redirectHandler = () => {
    navigate(`/post/${item._id}`);
  }

  return (
    <>
      <div onClick={redirectHandler} className={styles.div1}>
        <div className={styles.div2}>
          <span className={styles.span1}>{item.owner.username}</span> ◷ {date}, {time}
          <span className="ml-2">IN:</span> <span className={styles.span2}>{item.category}</span>
        </div>
        <div className={styles.div3}>{item.title} </div>  <CommentsRating item={item} />
      </div>
    </>
  )
}

export default ListItems
