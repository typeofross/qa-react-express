import { NavLink, useNavigate, useParams } from 'react-router';
import ListItems from '/src/components/partials/ListItems.jsx';
import Pagination from '/src/components/partials/Pagination.jsx';
import useRequest from '/src/hooks/useRequest';
import ErrorToast from '/src/components/partials/ErrorToast.jsx';
import NoPostsToShow from '/src/components/partials/NoPostsToShow.jsx';

function Category() {
  const params = useParams();
  const navigate = useNavigate();

  const request = {
    type: "category",
    data: {
      p1: params.name,
      p2: params.number
    },
    state: params.number
  }

  const [response, content, error] = useRequest(request);

  const handlePageChange = (page) => {
    navigate(`/category/${params.name}/page/${page}`);
  };

  const totalPages = Math.ceil(response.posts / response.limit);

  const styles = {
    div1: "grid grid-cols-[200px_auto] sticky top-0 bg-white",
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
        {error && <ErrorToast error={error} />}

        {!content && <NoPostsToShow />}

        {response.message && response.message.map(item =>
          <ListItems
            key={item._id}
            item={item} />
        )}
      </div>
    </>
  )
}

export default Category
