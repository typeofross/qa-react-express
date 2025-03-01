import { NavLink, useParams } from 'react-router';

function Category() {
  const params = useParams();

  return (
    <>
      <title>Category</title>
      <NavLink to='/'>↵ BACK TO HOME</NavLink>

      <div className="mt-[30px]"></div>
      {/* To do category */}

    </>
  )
}

export default Category
