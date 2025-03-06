import { NavLink, useNavigate, useParams } from 'react-router';
import { useEffect, useState } from 'react';
import ListItems from '/src/components/partials/ListItems.jsx';
import services from '/services/fetch.js';
import Pagination from '/src/components/partials/Pagination.jsx';

function Category() {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState('');

  useEffect(() => {
    getCategory()
  }, [params.number])

  const handlePageChange = (page) => {
    navigate(`/category/${params.name}/page/${page}`);
  };

  const getCategory = async () => {
    try {
      const response = await services.get('category', params.name, params.number);

      if (response.status !== 'success') {
        throw new Error(response.message)
      }
      setData(response);
    }
    catch (err) {
      navigate('/404');
      console.error(err)
    }
  }

  const totalPages = Math.ceil(data.posts / data.limit);

  if (!data) {
    return "Loading..."
  }

  return (
    <>
      <title>Category</title>
      <NavLink to='/'>↵ BACK TO HOME</NavLink>

      <div className="mt-5">
        {data.message.map(item =>
          <ListItems
            key={item._id}
            item={item} />
        )}
      </div>

      {totalPages > 1 ?
        <Pagination
          currentPage={params.number}
          totalPages={totalPages}
          onPageChange={handlePageChange} />
        :
        ""}
    </>
  )
}

export default Category
