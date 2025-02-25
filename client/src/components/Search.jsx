import { useState } from "react";
import { useLocation } from "react-router";
import SearchInputField from "./partials/SearchInputField.jsx";

function Search() {
  const [dataFromSearchInput, setData] = useState('');
  const location = useLocation();
  let searchValue = location.state?.searchValue;

  const handleDataFromSearchInput = (data) => {
    searchValue = undefined;
    setData(data);
  };

  // Search results will be displayed from this component, so the search value
  // Will be either as props sent from Child, or, as state from Home

  const searchFor = dataFromSearchInput ? dataFromSearchInput : searchValue;

  return (
    <>
      <title>Search</title>

      <div className="grid grid-cols-1 md:grid-cols-[100px_300px] justify-between items-center mb-[30px]">
        <div className="hidden md:block">
          <h1>SEARCH</h1>
        </div>
        <div>
          <SearchInputField focused={true} onDataChange={handleDataFromSearchInput} searchValue={searchFor} />
        </div>
      </div>

      <h1>Searching for.. {searchFor}</h1>
    </>
  )
}

export default Search
