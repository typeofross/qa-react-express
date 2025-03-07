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
    div1: "bg-white rounded-lg border-1 border-gray-200 p-3 pt-5 pb-5 mb-4 grid grid-cols-[40px_1fr] gap-3",
    div2: "grid place-items-center w-10 h-10 rounded-full border-1 border-gray-300",
    div3: "grid grid-rows-[auto_auto_1fr]",
    span: "text-lg font-semibold uppercase",
    span2: "w-fit bg-red-700  font-bold text-white rounded-lg p-1 text-xs ml-1 cursor-pointer",
    span3: "w-fit bg-white  font-bold text-gray-800 border-1 border-gray-500 rounded-lg p-1 text-xs ml-1 cursor-pointer",
    span4: "text-[11px] ml-1 text-gray-700 font-bold cursor-pointer underline ",
    navLink1: "text-[11px] ml-2 text-gray-700 font-normal",
    navLink2: "text-[11px] ml-1 text-gray-700 font-normal",
    h3: "text-sm font-semibold inline",
    p3: "text-red-700 text-xs mt-1",
    p1: "text-xs text-gray-500",
    p2: "text-gray-800 leading-relaxed",
    button3: `text-xs text-emerald-700 font-bold p-1 bg-gray-50 border-1 border-gray-200 rounded-lg`,
    button4: `text-xs text-rose-700 font-bold ml-2 p-1 bg-gray-50 border-1 border-gray-200 rounded-lg`,
    button5: `text-xs bg-emerald-200 font-bold p-1 text-emerald-700 border-1 border-emerald-200 rounded-lg`,
    button6: `text-xs bg-rose-200 font-bold ml-2 p-1 text-rose-700 border-1 border-rose-200 rounded-lg`,
    textarea: `bg-blue-50 w-full h-full custom-scrollbar overflow-auto rounded-lg focus:outline-none focus:border-none`
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

  const handleTextAreaSubmit = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      commentUpdateHandler(e);
    }
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
          <div className={styles.h3}>{comment.owner.username}
            {comment.isOwner &&
              <>
                <NavLink onClick={() => commentUpdate(comment._id)} className={styles.navLink1}>🖉 EDIT</NavLink>
                <NavLink onClick={deleteConfirmationHandler} className={styles.navLink2}>🞬 REMOVE</NavLink>

                {msg &&
                  <>
                    <span className={styles.span4} onClick={() => commentDeleteHandler(comment._id)}>CONFIRM</span>
                    <span className={styles.span4} onClick={deleteConfirmationHandler}>CANCEL</span>
                  </>
                }

              </>

            }
          </div>
          <p className={styles.p1}>{date}, {time}</p>
          {update && update == comment._id ?
            <form id={comment._id}>
              <textarea
                type="text"
                className={styles.textarea}
                onInput={() => setCommentError('')}
                onKeyDown={(e) => handleTextAreaSubmit(e)}
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
          <div className="w-fit justify-self-right mt-1">
            <NavLink onClick={() => rate('rateComment', comment._id, 'like')} className={button1}>{comment.likes.length} ▲</NavLink>
            <NavLink onClick={() => rate('rateComment', comment._id, 'dislike')} className={button2}>{comment.dislikes.length} ▼</NavLink>
          </div>
        </div>
      </div >
    </>);
}

export default CommentItem
