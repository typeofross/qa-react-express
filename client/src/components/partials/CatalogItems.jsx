import { NavLink } from "react-router"

function CatalogItems(props) {
  const link = `/category/${props.entry._id}/page/1`;
  return (
    <>
      <NavLink to={link} className='bg-gray-900 w-[100%] py-15 sm:py-20 text-center border-white text-xl md:text-3xl font-extrabold hover:bg-indigo-600'>
        <div>{props.entry._id}</div>
        <div className="text-xs md:text-sm">{props.entry.count} {props.entry.count == 1 ? "post" : "posts"}</div>
      </NavLink>

    </>
  )
}

export default CatalogItems
