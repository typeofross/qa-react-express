import React, { useState, useEffect } from 'react';
import services from '../../services/fetch.js';
import ListItems from './partials/ListItems.jsx';
import SearchInputField from './partials/SearchInputField.jsx';
import { useLocation } from 'react-router';
import CatalogItems from './partials/CatalogItems.jsx';

function Home() {
  const [data, setData] = useState([]);

  // From state when redirecting from Search to Home if value is empty (so it can hold the focus on the input)
  const location = useLocation();
  const from = location.state?.from;

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await services.getLatest();

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
      <div className="sm:w-[350px]">
        <SearchInputField focused={from ? true : false} fromHome={true} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-[200px_auto] mt-8 gap-3">
        <div className="md:border-r-1 md:border-gray-200">
          <p className="text-xs mb-4">CATEGORIES:</p>
          <CatalogItems />
        </div>
        <div className="mt-5 md:mt-0">
          <p className="text-xs mb-4">NEWEST POSTS:</p>
          {data.map(entry =>
            <ListItems key={entry._id} entry={entry} />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;