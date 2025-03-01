function CommentsRating(props) {
    return (
        <>
            <div className={`inline text-sm ml-3`}>
                <span className="text-green-700 font-bold p-1 bg-gray-50 border-1 border-gray-200 rounded-sm">{props.entry.likes.length} ▲</span>
                <span className="text-red-700 font-bold ml-2 p-1 bg-gray-50 border-1 border-gray-200 rounded-sm">{props.entry.dislikes.length} ▼</span>
                {props.entry.comments.length ? <span className="ml-2 font-bold p-1 bg-blue-50 border-1 border-gray-200 rounded-sm text-blue-950">{props.entry.comments.length} <span className="font-normal">🖂</span></span> : ""}
            </div>
        </>
    )
}

export default CommentsRating