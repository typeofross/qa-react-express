import { useNavigate } from 'react-router';
import CommentsRating from './ListItemsCommentsRating.jsx';

function ListItems(props) {
  const navigate = useNavigate();
  const date = new Date(props.entry.createdAt).toDateString();
  const time = new Date(props.entry.createdAt).toLocaleTimeString();
  const redirectHandler = () => {
    navigate(`/post/${props.entry._id}`);
  }
  return (
    <>
      <div onClick={redirectHandler} className="cursor-pointer mb-4">
        <div className="text-xs mb-0.5">{date}, {time}
          <span className="ml-2">IN:</span> <span className="ml-1 p-1 border-1 border-gray-300 rounded-sm pl-2 pr-2">{props.entry.category}</span>
        </div>
        <div className="hover:text-indigo-600 inline md:text-xl">{props.entry.title} </div>  <CommentsRating entry={props.entry} />
      </div>
    </>
  )
}

export default ListItems
