function HomeLatestItems(props) {

  return (
    <>
      <div className="grid grid-cols-[1fr_7fr_20px] gap-3 pt-2 pb-2 justify-items-start max-sm:text-xs sm:text-sm">
        <div>{new Date(props.entry.createdAt).toLocaleDateString()}</div>
        <div>{props.entry.title}</div>
        <div className="justify-self-end hidden md:block">{props.entry.comments.length}</div>
      </div>
    </>
  )
}

export default HomeLatestItems
