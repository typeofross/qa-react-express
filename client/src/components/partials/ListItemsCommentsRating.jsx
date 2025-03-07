function CommentsRating({ item }) {
    const styles = {
        div: "inline text-xs ml-2",
        span1: "text-stone-600 font-bold p-1 bg-stone-50 border-1 border-gray-200 rounded-sm",
        span2: "text-stone-600 font-bold ml-2 p-1 bg-stone-50 border-1 border-gray-200 rounded-sm",
        span3: "ml-2 font-bold p-1 bg-blue-50 border-1 border-gray-200 rounded-sm text-stone-600",
        span4: "font-normal"
    }

    return (
        <>
            <div className={styles.div}>
                {!item.likes.length && !item.dislikes.length ?
                    ""
                    :
                    <>
                        <span className={styles.span1}>{item.likes.length} <span className="text-emerald-700">▲</span></span>
                        <span className={styles.span2}>{item.dislikes.length} <span className="text-rose-800">▼</span></span>
                    </>
                }

                {item.comments[0] &&
                    <span className={styles.span3}>{item.comments.length} <span className={styles.span4}>🗩</span></span>
                }
            </div>
        </>
    )
}

export default CommentsRating