function Pagination({ currentPage, totalPages, onPageChange }) {

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  const styles = {
    span1: "text-sm p-3 border-1 border-gray-200 cursor-pointer mr-3",
    span2: "bg-indigo-600 text-white font-bold"
  }
  return (
    <>
      <div className="mt-10">
        {pages.map(page => {
          return <span
            onClick={() => onPageChange(page)}
            className={`${styles.span1} ${currentPage == page ? `${styles.span2}` : ``}`}>
            {page}
          </span>
        })}
      </div>
    </>);
}

export default Pagination
