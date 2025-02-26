function CommentsRating(props) {
    return (
        <>
            <div className={`text-xs ${props.className ?? ""}`}>
                <span className="text-green-600 font-bold">{props.entry.likes.length} ▲</span>
                <span className="text-red-600 font-bold ml-2">{props.entry.dislikes.length} ▼</span>
                {props.entry.comments.length ? <span className="p-1 bg-gray-800 rounded-md ml-2">COMMENTS: {props.entry.comments.length}</span> : ""}
            </div>
        </>
    )
}

export default CommentsRating