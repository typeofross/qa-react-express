import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import services from '/services/fetch.js';
import ListItems from "/src/components/partials/ListItems.jsx";
import NoPostsToShow from "/src/components/partials/NoPostsToShow.jsx";
import ErrorToast from "/src/components/partials/ErrorToast.jsx";

function Search() {
  const location = useLocation();
  let searchValue = location.state?.searchValue;

  const [data, setData] = useState([]);
  const [msg, setMsg] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    getSearch()
  }, [searchValue])

  const getSearch = async () => {
    try {
      const response = await services.get('search', searchValue);

      if (response.status === 204) {
        setMsg(true);
      }

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      setMsg(false);
      setData(response.message);

    } catch (err) {
      setData([])
      console.error(err)
      setError(err.message);
    }
  }

  return (
    <>
      <title>Search</title>

      {error && <ErrorToast error={error} setError={setError} />}

      {msg && <NoPostsToShow />}

      {data && data.map(item =>
        <ListItems
          key={item._id}
          item={item}
        />
      )}
    </>
  )
}

export default Search
