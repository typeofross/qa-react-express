function Pagination(
  {
    currentPage,
    totalPages,
    onPageChange
  }) {

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const styles = {
    span1: "p-2 pl-3 pr-3 border-1 border-gray-200 rounded-lg mt-2 mr-2 text-xs hover:bg-stone-100 cursor-pointer",
    span2: "!border-blue-200 bg-blue-200 text-blue-950 font-bold"
  }
  return (
    <>
      <div className="mt-2">
        {pages.map(page => {
          return <span
            key={page}
            onClick={() => onPageChange(page)}
            className={`${styles.span1} ${currentPage == page ? `${styles.span2}` : ``}`}>
            {page}
          </span>
        })}
      </div>
    </>);
}

export default Pagination
