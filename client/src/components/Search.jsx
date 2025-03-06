import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import services from '/services/fetch.js';
import ListItems from "/src/components/partials/ListItems.jsx";

function Search() {
  const location = useLocation();
  let searchValue = location.state?.searchValue;

  const [data, setData] = useState([]);

  useEffect(() => {
    getSearch()
  }, [searchValue])

  const getSearch = async () => {
    try {
      const response = await services.get('search', searchValue);

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      setData(response.message);

    } catch (err) {
      setData([])
      console.error(err)
    }
  }

  return (
    <>
      <title>Search</title>

      {data.map(item =>
        <ListItems
          key={item._id}
          item={item}
        />
      )}
    </>
  )
}

export default Search
