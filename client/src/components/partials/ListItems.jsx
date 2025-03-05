import { useNavigate } from 'react-router';
import CommentsRating from './ListItemsCommentsRating.jsx';

const styles = {
  div1: "cursor-pointer mb-4",
  div2: "text-xs mb-0.5",
  div3: "hover:text-indigo-600 inline md:text-xl",
  span1: "p-1 border-1 border-gray-300 rounded-sm pl-2 pr-2",
  span2: "ml-1 p-1 border-1 border-gray-300 rounded-sm pl-2 pr-2"
}

function ListItems(props) {
  const navigate = useNavigate();
  const date = new Date(props.entry.createdAt).toDateString();
  const time = new Date(props.entry.createdAt).toLocaleTimeString();
  const redirectHandler = () => {
    navigate(`/post/${props.entry._id}`);
  }
  return (
    <>
      <div onClick={redirectHandler} className={styles.div1}>
        <div className={styles.div2}><span className={styles.span1}>{props.entry.owner.username}</span> ◷ {date}, {time}
          <span className="ml-2">IN:</span> <span className={styles.span2}>{props.entry.category}</span>
        </div>
        <div className={styles.div3}>{props.entry.title} </div>  <CommentsRating entry={props.entry} />
      </div>
    </>
  )
}

export default ListItems
