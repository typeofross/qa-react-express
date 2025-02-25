import React, { useState, useEffect } from 'react';
import services from '../../services/fetch.js';
import HomeLatestItems from './partials/HomeLatestItems.jsx';
import SearchInputField from './partials/SearchInputField.jsx';
import { useLocation } from 'react-router';

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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-[100px_300px] justify-between items-center mb-[30px]">
        <div className="hidden md:block">
          <h1>LATEST</h1>
        </div>
        <div>
          <SearchInputField focused={from ? true : false} fromHome={true} />
        </div>
      </div>

      {data.map(entry =>
        <HomeLatestItems key={entry._id} entry={entry} />
      )}
    </div>
  );
}

export default Home;