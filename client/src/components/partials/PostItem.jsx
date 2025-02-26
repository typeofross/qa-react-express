function PostItem(props) {
  return (
    <>
      <div className="grid grid-cols-2 mb-10 text-xs md:text-lg">
        <div className="justify-self-start">
          {new Date(props.post.createdAt).toUTCString()}
        </div>
        <div className="justify-self-end">
          <span className="p-1 bg-green-600 rounded-md text-sm">{props.post.likes?.length} ▲</span>
          <span className="p-1 bg-red-600 rounded-md ml-2 text-sm">{props.post.dislikes?.length} ▼</span>
        </div>
      </div>
      <h1 className="text-2xl text-center">{props.post.title}</h1>
      <article className="mt-10">
        {props.post.body}
      </article>

      <div className="mt-8 text-xl pl-5 bg-gray-900 border-l-3 border-indigo-600">COMMENTS:</div>

      <div className="mt-5">
        {/* comments here */}
        {props.post.comments.map(comment => {
          return <p>{comment.body}</p>;
        })}
      </div>
    </>
  )
}

export default PostItem
