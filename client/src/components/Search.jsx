import { useLocation } from "react-router";

function Search() {
  const location = useLocation();
  let searchValue = location.state?.searchValue;

  return (
    <>
      <title>Search</title>

      <h1 className="mt-5">Searching for.. {searchValue}</h1>
    </>
  )
}

export default Search
