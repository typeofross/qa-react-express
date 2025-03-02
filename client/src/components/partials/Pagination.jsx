function Pagination({ currentPage, totalPages, onPageChange }) {

  let pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <>
      <div className="mt-10">
        {pages.map(page => {
          return <span onClick={() => onPageChange(page)} className={`text-sm p-3 border-1 border-gray-200 cursor-pointer mr-3 ${currentPage == page ? `bg-indigo-600 text-white font-bold` : ``}`}>{page}</span>
        })}
      </div>
    </>);
}

export default Pagination
