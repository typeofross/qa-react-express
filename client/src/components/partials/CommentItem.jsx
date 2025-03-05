function CommentItem({ props }) {
  const date = new Date(props.createdAt).toDateString();
  const time = new Date(props.createdAt).toLocaleTimeString();

  const styles = {
    div1: "bg-white rounded-sm border-1 border-gray-200 p-5 mb-4 grid grid-cols-[40px_1fr] gap-3",
    div2: "grid place-items-center w-10 h-10 rounded-full border-1 border-gray-300",
    div3: "grid grid-rows-[auto_auto_1fr]",
    span: "text-lg font-semibold uppercase",
    h3: "text-sm font-semibold",
    p1: "text-xs text-gray-500",
    p2: "text-gray-800 leading-relaxed"
  }

  return (
    <>
      <div key={props._id} className={styles.div1}>
        <div className={styles.div2}>
          <span className={styles.span}>{props.owner.username.charAt(0)}</span>
        </div>
        <div className={styles.div3}>
          <h3 className={styles.h3}>{props.owner.username}</h3>
          <p className={styles.p1}>{date}, {time}</p>
          <p className={styles.p2}>{props.body}</p>
        </div>
      </div>
    </>);
}

export default CommentItem
