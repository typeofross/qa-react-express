function CommentsRating(props) {
    const styles = {
        div: "inline text-sm ml-3",
        span1: "text-green-700 font-bold p-1 bg-gray-50 border-1 border-gray-200 rounded-sm",
        span2: "text-red-700 font-bold ml-2 p-1 bg-gray-50 border-1 border-gray-200 rounded-sm",
        span3: "ml-2 font-bold p-1 bg-blue-50 border-1 border-gray-200 rounded-sm text-blue-950",
        span4: "font-normal"
    }

    return (
        <>
            <div className={styles.div}>
                <span className={styles.span1}>{props.entry.likes.length} ▲</span>
                <span className={styles.span2}>{props.entry.dislikes.length} ▼</span>
                {props.entry.comments.length ? <span className={styles.span3}>{props.entry.comments.length} <span className={styles.span4}>🗩</span></span> : ""}
            </div>
        </>
    )
}

export default CommentsRating