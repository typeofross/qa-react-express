import config from '/config.js';

function CommentItem({ props }) {
  const date = new Date(props.createdAt).toDateString();
  const time = new Date(props.createdAt).toLocaleTimeString();
  let classValues = `grid place-items-center w-10 h-10 rounded-full bg-${config.color(props.owner.username.length)}-300`;

  return (
    <>
      <div key={props._id} className="bg-white rounded-sm border-1 border-gray-200 p-5 mb-4 grid grid-cols-[40px_1fr] gap-3">
        <div className={classValues}>
          <span className="text-lg font-semibold uppercase">{props.owner.username.charAt(0)}</span>
        </div>
        <div className="grid grid-rows-[auto_auto_1fr]">
          <h3 className="text-sm font-semibold">{props.owner.username}</h3>
          <p className="text-xs text-gray-500">{date}, {time}</p>
          <p className="text-gray-800 leading-relaxed">{props.body}</p>
        </div>
      </div>
    </>);
}

export default CommentItem
