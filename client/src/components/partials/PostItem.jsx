import CommentItem from './CommentItem.jsx';
import CommentForm from './CommentForm.jsx';
import config from '/config.js'
import { NavLink } from 'react-router';
import { useState } from 'react';

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
    setUpdate,
    commentError,
    setCommentError,
    deleteActionHandler
  }) {

  const [actionsMenu, toggleActionsMenu] = useState(false);
  const [deleteConfirmationModal, toggleDeleteConfirmationModal] = useState(false);

  const date = new Date(post.createdAt).toDateString();
  const time = new Date(post.createdAt).toLocaleTimeString();

  const styles = {
    div: "m-2",
    div1: "grid grid-cols-2 mb-5 text-md md:text-lg text-gray-700 ",
    div2: "justify-self-start text-sm",
    div3: "justify-self-end",
    div4: "mt-8 text-xl pl-5 bg-gray-100 border-1 border-gray-200 rounded-lg",
    div5: "border-1 border-gray-200 rounded-lg shadow-lg mt-3 ml-[-7%] md:ml-[-1.1%] absolute w-[150px] z-1 bg-white",
    div6: "absolute top-0 left-0 w-full h-full [background-color:rgba(0,0,0,0.5)] ",
    div7: "mt-[40%] w-[400px] md:mt-[10%] md:w-[500px]  grid justify-self-center bg-white rounded-lg p-5 border-1 border-gray-800 text-lg",
    navLink1: "border-1 border-slate-200 p-1 rounded-lg hover:bg-slate-200",
    navLink2: "text-sm block p-1 hover:bg-slate-200",
    h1: "text-2xl text-gray-900 sticky top-0 bg-white pb-5 pt-2",
    span1: "text-xs md:text-md p-2 border-1 rounded-md tracking-widest border-red-200 bg-red-200 text-red-700 hover:bg-red-500 hover:border-red-500 hover:text-white cursor-pointer",
    span2: "ml-3 text-xs md:text-md p-2 border-1 rounded-md tracking-widest border-gray-200 bg-stone-50 text-gray-800 hover:bg-stone-100 cursor-pointer",
    button3: `text-emerald-700 font-bold p-1 bg-gray-50 border-1 border-gray-200 rounded-lg`,
    button4: `text-rose-700 font-bold ml-2 p-1 bg-gray-50 border-1 border-gray-200 rounded-lg`,
    button5: `bg-emerald-200 font-bold p-1 text-emerald-700 border-1 border-emerald-200 rounded-lg`,
    button6: `bg-rose-200 font-bold ml-2 p-1 text-rose-700 border-1 border-rose-200 rounded-lg`,
    button7: `bg-gray-50 font-bold ml-2 p-1 text-gray-500 border-1 border-gray-200 rounded-lg`
  }

  let button1 = styles.button3;
  let button2 = styles.button4;

  if (post.isLiked) {
    button1 = styles.button5;
  }

  if (post.isDisliked) {
    button2 = styles.button6;
  }

  const actionsHandler = () => {
    toggleActionsMenu(actionsMenu => !actionsMenu);
  }

  const deleteConfirmationHandler = () => {
    toggleActionsMenu(actionsMenu => false);
    toggleDeleteConfirmationModal(deleteConfirmationModal => !deleteConfirmationModal)
  }


  return (
    <>
      <div className={styles.div}>
        <div className={styles.div1}>
          <div className={styles.div2}>
            ◷ {date}, {time}
            <div className="mt-2">By <b>{post.owner.username}</b> in <NavLink className={styles.navLink1} to={`/category/${post.category}/page/1`}>{post.category}</NavLink></div>
          </div>

          <div className={styles.div3}>
            <NavLink onClick={() => rate('ratePost', post._id, 'like')} className={button1}>{post.likes.length} ▲</NavLink>
            <NavLink onClick={() => rate('ratePost', post._id, 'dislike')} className={button2}>{post.dislikes.length} ▼</NavLink>
            {post.isOwner &&
              <>
                <NavLink onClick={actionsHandler} className={styles.button7}>⋮</NavLink>

                {actionsMenu &&
                  <div className={styles.div5}>
                    <NavLink onClick={deleteConfirmationHandler} className={styles.navLink2}>DELETE</NavLink>
                    <NavLink to={`/update/${post._id}`} className={styles.navLink2}>UPDATE</NavLink>
                  </div>
                }
              </>
            }
          </div>
        </div>

        <h1 className={styles.h1}>{post.title}</h1>
        <article className="mt-5 text-gray-700">
          {post.body}
        </article>

        {config.getCookie() &&

          <CommentForm
            handleSubmitComment={handleSubmitComment}
            comment={comment}
            setComment={setComment}
            error={error}
            setError={setError}
          />}

        {post.comments[0] &&
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
                  commentError={commentError}
                  setCommentError={setCommentError}
                />
              })}
            </div>
          </>
        }
      </div>
      {deleteConfirmationModal &&
        <div className={styles.div6} onClick={deleteConfirmationHandler}>
          <div className={styles.div7}>
            Do you want to delete this post and all associated data?

            <div className="text-center mt-5">
              <span className={styles.span1} onClick={deleteActionHandler}>CONFIRM</span> <span className={styles.span2}>CANCEL</span>
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default PostItem
