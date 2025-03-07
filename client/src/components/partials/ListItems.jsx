import { useNavigate } from 'react-router';
import CommentsRating from './ListItemsCommentsRating.jsx';

const styles = {
  div1: "cursor-pointer text-xs mb-3 shadow-sm rounded-lg p-2 hover:shadow-lg hover:bg-stone-50 border-1 border-gray-100 m-2 ",
  div2: "text-xs mb-2 mt-1 grid grid-cols-[1fr_1fr] space-between",
  div3: "justify-self-end",
  div4: "text-lg p-2 bg-stone-100 rounded-lg text-stone-700",
  div5: "p-2 text-xs border-1 border-gray-200 bg-white mt-2 rounded-lg text-gray-700",
  span1: "p-1 border-1 border-gray-300 rounded-sm pl-2 pr-2 font-medium",
  span2: "text-slate-500 text-[10px] md:text-xs"
}

function ListItems({ item }) {
  const navigate = useNavigate();
  const date = new Date(item.createdAt).toDateString();
  const time = new Date(item.createdAt).toLocaleTimeString();
  let commentDate;

  if(item.comments.length) { 
    commentDate = new Date(item.comments[0].createdAt).toDateString();
  }

  const redirectHandler = () => {
    navigate(`/post/${item._id}`);
  }

  return (
    <>
      <div onClick={redirectHandler} className={styles.div1}>
        <div className={styles.div2}>
          <div>
            <span className={styles.span1}>{item.owner.username}</span> <span className={styles.span2}>◷ {date}, {time}</span>
          </div>
          <div className={styles.div3}>
            <CommentsRating item={item} />
          </div>
        </div>
        <div className={styles.div4}>
          <div>
            {item.title}
          </div>
          {item.comments.length > 0 ?
            <>
              <div className={styles.div5}>
                Last commented by <span className="font-medium">{item.comments[0].owner.username}</span> on {commentDate}
              </div>
            </>
            :
            ""
          }

        </div>
      </div>
    </>
  )
}

export default ListItems
