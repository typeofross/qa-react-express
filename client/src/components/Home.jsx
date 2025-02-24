import React, { useState, useEffect } from 'react';
import services from '../../services/fetch.js';

function Home() {
  const [data, setData] = useState([]);

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
      <h1 className="mb-[30px]">LATEST</h1>

      {data.map(entry =>
        <div className="grid grid-cols-[1fr_7fr_20px] gap-3 pt-2 pb-2 justify-items-start text-sm md:text-lg" key={entry._id}>
          <div>{new Date(entry.createdAt).toLocaleDateString()}</div>
          <div>{entry.title}</div>
          <div className="justify-self-end hidden md:block">{entry.comments.length}</div>
        </div>
      )}
    </div>
  );
}

export default Home;