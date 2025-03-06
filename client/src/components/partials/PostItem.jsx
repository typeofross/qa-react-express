import CommentItem from './CommentItem.jsx';
import CommentForm from './CommentForm.jsx';
import config from '/config.js'
import { NavLink } from 'react-router';

function PostItem(
  {
    post,
    rate,
    handleSubmitComment,
    error,
    setError,
    comment,
    setComment,
    updatedComment,
    setCommentUpdate,
    commentDeleteHandler,
    commentUpdateHandler,
    update,
    setUpdate
  }) {

  const date = new Date(post.createdAt).toDateString();
  const time = new Date(post.createdAt).toLocaleTimeString();

  const styles = {
    div1: "grid grid-cols-2 mb-10 text-md md:text-2xl",
    div2: "justify-self-start text-sm",
    div3: "justify-self-end",
    div4: "mt-8 text-xl pl-5 bg-gray-100 border-1 border-gray-200 rounded-sm",
    navLink1: "w-fit border-2 border-red-700 text-red-700 hover:bg-red-700  font-bold hover:text-white rounded-sm p-2 text-xs",
    navLink2: "w-fit border-2 border-blue-700 text-blue-700 hover:bg-blue-700  font-bold hover:text-white rounded-sm p-2 text-xs ml-2",
    h1: "text-2xl",
    button3: `text-green-700 font-bold p-1 bg-gray-50 border-1 border-gray-200 rounded-sm`,
    button4: `text-red-700 font-bold ml-2 p-1 bg-gray-50 border-1 border-gray-200 rounded-sm`,
    button5: `bg-green-700 font-bold p-1 text-white border-1 border-green-800 rounded-sm`,
    button6: `bg-red-700 font-bold ml-2 p-1 text-white border-1 border-green-800 rounded-sm`,
  }

  let button1 = styles.button3;
  let button2 = styles.button4;

  if (post.isLiked) {
    button1 = styles.button5;
  }

  if (post.isDisliked) {
    button2 = styles.button6;
  }

  return (
    <>
      <div className={styles.div1}>
        <div className={styles.div2}>
          {date}, {time}
        </div>

        <div className={styles.div3}>
          <NavLink onClick={() => rate('ratePost', post._id, 'like')} className={button1}>{post.likes.length} ▲</NavLink>
          <NavLink onClick={() => rate('ratePost', post._id, 'dislike')} className={button2}>{post.dislikes.length} ▼</NavLink>
        </div>

        {post.isOwner ?
          <>
            <div>
              <NavLink to={`/delete/${post._id}`} className={styles.navLink1}>DELETE</NavLink>
              <NavLink to={`/update/${post._id}`} className={styles.navLink2}>UPDATE</NavLink>
            </div>
          </>
          : ""}

      </div>

      <h1 className={styles.h1}>{post.title}</h1>
      <article className="mt-5">
        {post.body}
      </article>

      {config.getCookie() ?

        <CommentForm
          handleSubmitComment={handleSubmitComment}
          comment={comment}
          setComment={setComment}
          error={error}
          setError={setError}
        />

        : ""}

      {post.comments.length ?
        <>
          <div className={styles.div4}>COMMENTS:</div>

          <div className="mt-5">
            {post.comments.map(comment => {
              return <CommentItem
                comment={comment}
                rate={rate}
                updatedComment={updatedComment}
                setCommentUpdate={setCommentUpdate}
                commentDeleteHandler={commentDeleteHandler}
                commentUpdateHandler={commentUpdateHandler}
                update={update}
                setUpdate={setUpdate}
                key={comment._id}
              />
            })}
          </div>
        </>
        : ""}
    </>
  )
}

export default PostItem
