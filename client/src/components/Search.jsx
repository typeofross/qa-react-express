import { useEffect, useState } from "react";
import { useLocation } from "react-router";
import services from '../../services/fetch.js';
import ListItems from "./partials/ListItems.jsx";

function Search() {
  const location = useLocation();
  let searchValue = location.state?.searchValue;

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await services.search(searchValue);

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      setData(response.message);

    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <title>Search</title>

      {data.map(entry =>
        <ListItems key={entry._id} entry={entry} />
      )}
    </>
  )
}

export default Search
