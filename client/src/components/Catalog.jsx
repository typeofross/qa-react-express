import React, { useState, useEffect } from 'react';
import services from '../../services/fetch.js';
import CatalogItems from './partials/CatalogItems.jsx';

function Catalog() {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const response = await services.getCatalog();

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
      <title>Catalog</title>
      <h1>CATALOG</h1>

      <div className="mt-[30px]"></div>

      <div className="grid grid-cols-[1fr_1fr] md:grid-cols-[1fr_1fr_1fr] gap-3 pt-2 pb-2 max-sm:text-xs sm:text-sm">

        {data.map(entry =>
          <CatalogItems key={entry._id} entry={entry} />
        )}

      </div>
    </>
  )
}

export default Catalog
