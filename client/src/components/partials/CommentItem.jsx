import { useState } from "react";
import { NavLink } from "react-router";

function CommentItem(
  {
    comment,
    rate,
    updatedComment,
    setCommentUpdate,
    commentDeleteHandler,
    commentUpdateHandler,
    update,
    setUpdate,
    commentError,
    setCommentError
  }) {

  const [msg, setMsg] = useState(false);

  const date = new Date(comment.createdAt).toDateString();
  const time = new Date(comment.createdAt).toLocaleTimeString();

  const styles = {
    div1: "bg-white rounded-sm border-1 border-gray-200 p-5 mb-4 grid grid-cols-[40px_1fr] gap-3",
    div2: "grid place-items-center w-10 h-10 rounded-full border-1 border-gray-300",
    div3: "grid grid-rows-[auto_auto_1fr]",
    span: "text-lg font-semibold uppercase",
    span2: "w-fit bg-red-700  font-bold text-white rounded-sm p-1 text-xs ml-1 cursor-pointer",
    span3: "w-fit bg-white  font-bold text-gray-800 border-1 border-gray-500 rounded-sm p-1 text-xs ml-1 cursor-pointer",
    navLink1: "w-fit border-1 border-red-700 text-red-700 hover:bg-red-700  font-bold hover:text-white rounded-sm p-1 text-xs ml-2",
    navLink2: "w-fit border-1 border-blue-700 text-blue-700 hover:bg-blue-700  font-bold hover:text-white rounded-sm p-1 text-xs ml-2",
    h3: "text-sm font-semibold",
    p3: "text-red-700 text-xs mt-1",
    p1: "text-xs text-gray-500",
    p2: "text-gray-800 leading-relaxed",
    button3: `text-green-700 font-bold p-1 text-xs bg-gray-50 border-1 border-gray-200 rounded-sm`,
    button4: `text-red-700 font-bold ml-2 p-1 text-xs bg-gray-50 border-1 border-gray-200 rounded-sm`,
    button5: `bg-green-700 font-bold p-1 text-white text-xs border-1 border-green-800 rounded-sm`,
    button6: `bg-red-700 font-bold ml-2 p-1 text-white text-xs border-1 border-green-800 rounded-sm`,
  }

  let button1 = styles.button3;
  let button2 = styles.button4;

  if (comment.isLiked) {
    button1 = styles.button5;
  }

  if (comment.isDisliked) {
    button2 = styles.button6;
  }

  const deleteConfirmationHandler = () => {
    setMsg(msg => !msg);
  }

  const commentUpdate = (id) => {
    setUpdate(update ? false : id);
    setCommentUpdate({ body: comment.body })
  }

  return (
    <>
      <div key={comment._id} className={styles.div1}>
        <div className={styles.div2}>
          <span className={styles.span}>{comment.owner.username.charAt(0)}</span>

        </div>
        <div className={styles.div3}>
          <h3 className={styles.h3}>{comment.owner.username}</h3>
          <p className={styles.p1}>{date}, {time}</p>
          {update && update == comment._id ?
            <form onSubmit={commentUpdateHandler} id={comment._id}>
              <input
                type="text"
                className="bg-blue-50"
                onInput={() => setCommentError('')}
                value={updatedComment.body}
                onChange={(e) => setCommentUpdate({ body: e.target.value })}
              />
            </form>
            :
            <p className={styles.p2}>{comment.body}</p>
          }

          {commentError && commentError.find(x => x.path == "body") && update == comment._id ?
            commentError.map(x => {
              if (x.path == "body") {
                return <p className={styles.p3}>{x.error}</p>
              }
            })
            : ""}
          <div className="w-fit justify-self-right">
            <NavLink onClick={() => rate('rateComment', comment._id, 'like')} className={button1}>{comment.likes.length} ▲</NavLink>
            <NavLink onClick={() => rate('rateComment', comment._id, 'dislike')} className={button2}>{comment.dislikes.length} ▼</NavLink>

            {comment.isOwner ?
              <>
                <NavLink onClick={() => commentUpdate(comment._id)} className={styles.navLink2}>EDIT</NavLink>
                <NavLink onClick={deleteConfirmationHandler} className={styles.navLink1}>REMOVE</NavLink>
                {msg ?
                  <> <span className={styles.span2} onClick={() => commentDeleteHandler(comment._id)}>YES</span> <span className={styles.span3} onClick={deleteConfirmationHandler}>NO</span></>
                  :
                  ""}
              </>
              : ""}
          </div>
        </div>
      </div >
    </>);
}

export default CommentItem
