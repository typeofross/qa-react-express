import { useNavigate } from 'react-router';
import CommentsRating from './ListItemsCommentsRating.jsx';

function ListItems(props) {
  const navigate = useNavigate();

  let body = props.entry.body.split(" ").slice(0, 40).join(" ");

  body == props.entry.body ? body : body += "...";

  const redirectHandler = () => {
    navigate(`/post/${props.entry._id}`);
  }
  return (
    <>
      <div onClick={redirectHandler} className="cursor-pointer hover:border-l-5 hover:border-gray-300 hover:pl-5">
        <div className="text-xs mb-2">

          <div className="md:grid md:grid-cols-[auto_1fr]">

            <div className="md:justify-self-start">{new Date(props.entry.createdAt).toUTCString()}
              <span className="ml-5">IN:</span> <span className="p-1 border-1 border-gray-500 rounded-md pl-2 pr-2">{props.entry.category}</span>
            </div>
            <div className="md:justify-self-start ml-5">
              <CommentsRating entry={props.entry} className="hidden md:block" />
            </div>
          </div>
        </div>
        <div className="md:mb-1 md:mt-3 md:text-xl">{props.entry.title}</div>
        <div className="text-xs md:mb-10 md:text-sm">{body}</div>
        <CommentsRating entry={props.entry} className="mt-2 mb-5 md:hidden" />
      </div>
    </>
  )
}

export default ListItems
