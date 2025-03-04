import CommentItem from './CommentItem.jsx';
import CommentForm from './CommentForm.jsx';
import config from '/config.js'
import { NavLink } from 'react-router';

function PostItem({ post, rate, comment, error, data, setData }) {

  const date = new Date(post.createdAt).toDateString();
  const time = new Date(post.createdAt).toLocaleTimeString();
  const likeButtonDefault = `text-green-700 font-bold p-1 bg-gray-50 border-1 border-gray-200 rounded-sm`;
  const dislikeButtonDefault = `text-red-700 font-bold ml-2 p-1 bg-gray-50 border-1 border-gray-200 rounded-sm`;

  const likeButtonSelected = `bg-green-700 font-bold p-1 text-white border-1 border-green-800 rounded-sm`;
  const dislikeButtonSelected = `bg-red-700 font-bold ml-2 p-1 text-white border-1 border-green-800 rounded-sm`;

  let likeButtonStyle = likeButtonDefault;
  let dislikeButtonStyle = dislikeButtonDefault;

  if (post.isLiked) {
    likeButtonStyle = likeButtonSelected;
  }

  if (post.isDisliked) {
    dislikeButtonStyle = dislikeButtonSelected;
  }

  const handleSubmitComment = () => {
    comment(data.body)
  }

  return (
    <>
      <div className="grid grid-cols-2 mb-10 text-md md:text-2xl">
        <div className="justify-self-start text-sm">
          {date}, {time}
        </div>

        <div className="justify-self-end">
          <NavLink onClick={() => rate('like')} className={likeButtonStyle}>{post.likes.length} ▲</NavLink>
          <NavLink onClick={() => rate('dislike')} className={dislikeButtonStyle}>{post.dislikes.length} ▼</NavLink>
        </div>

        {post.isOwner ?
          <>
            <div>
              <NavLink to={`/delete/${post._id}`} className="w-fit border-2 border-red-700 text-red-700 hover:bg-red-700  font-bold hover:text-white rounded-sm p-2 text-xs">DELETE</NavLink>
              <NavLink to={`/update/${post._id}`} className="w-fit border-2 border-blue-700 text-blue-700 hover:bg-blue-700  font-bold hover:text-white rounded-sm p-2 text-xs ml-2">UPDATE</NavLink>
            </div>
          </>
          : ""}

      </div>

      <h1 className="text-2xl">{post.title}</h1>
      <article className="mt-5">
        {post.body}
      </article>

      {config.getCookie() ?

        <CommentForm handleSubmitComment={handleSubmitComment} data={data} setData={setData} error={error} />

        : ""}

      {post.comments.length ?
        <>
          <div className="mt-8 text-xl pl-5 bg-gray-100 border-1 border-gray-200 rounded-sm">COMMENTS:</div>

          <div className="mt-5">
            {post.comments.map(comment => {
              return <CommentItem props={comment} key={comment._id} />
            })}
          </div>
        </>
        : ""}
    </>
  )
}

export default PostItem
