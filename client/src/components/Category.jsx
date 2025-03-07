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

  const styles = {
    div1: "grid grid-cols-[200px_auto]",
    div2: "justify-self-end",
    navLink: "block p-2 border-1 border-gray-200 rounded-lg m-2 w-fit text-xs hover:bg-stone-100"
  }

  return (
    <>
      <title>Category</title>
      <div className={styles.div1}>
        <div>
          <NavLink to='/' className={styles.navLink}>↵ BACK TO HOME</NavLink>
        </div>
        <div className={styles.div2}>
          {totalPages > 1 &&
            <Pagination
              currentPage={params.number}
              totalPages={totalPages}
              onPageChange={handlePageChange} />
          }
        </div>
      </div>

      <div className="mt-5">
        {data.message.map(item =>
          <ListItems
            key={item._id}
            item={item} />
        )}
      </div>
    </>
  )
}

export default Category
