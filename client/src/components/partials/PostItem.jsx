import { NavLink } from 'react-router';
import CommentItem from './CommentItem.jsx';

function PostItem(props) {
  const date = new Date(props.post.createdAt).toDateString();
  const time = new Date(props.post.createdAt).toLocaleTimeString();

  return (
    <>
      <div className="grid grid-cols-2 mb-10 text-md md:text-2xl">
        <div className="justify-self-start text-sm">
          {date}, {time}
        </div>

        <div className="justify-self-end">
          <span className="text-green-700 font-bold p-1 bg-gray-50 border-1 border-gray-200 rounded-sm">{props.post.likes.length} ▲</span>
          <span className="text-red-700 font-bold ml-2 p-1 bg-gray-50 border-1 border-gray-200 rounded-sm">{props.post.dislikes.length} ▼</span>
        </div>

        {props.post.isOwner ?
          <>
            <div>
              <NavLink to={`/delete/${props.post._id}`} className="w-fit border-2 border-red-700 text-red-700 hover:bg-red-700  font-bold hover:text-white rounded-sm p-2 text-xs">DELETE</NavLink>
              <NavLink to={`/update/${props.post._id}`} className="w-fit border-2 border-blue-700 text-blue-700 hover:bg-blue-700  font-bold hover:text-white rounded-sm p-2 text-xs ml-2">UPDATE</NavLink>
            </div>
          </>
          : ""}

      </div>

      <h1 className="text-2xl">{props.post.title}</h1>
      <article className="mt-5">
        {props.post.body}
      </article>

      {props.post.comments.length ? <div className="mt-8 text-xl pl-5 bg-gray-100 border-1 border-gray-200 rounded-sm">COMMENTS:</div> : ""}

      <div className="mt-5">
        {props.post.comments.map(comment => {
          return <CommentItem props={comment} key={comment._id} />
        })}
      </div>
    </>
  )
}

export default PostItem
