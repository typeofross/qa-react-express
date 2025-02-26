import React, { useState, useEffect } from 'react';
import services from '../../../services/fetch.js';
import { NavLink } from 'react-router';

function CatalogItemsHome() {
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

      setData(response.message.slice(0, 5));

    } catch (err) {
      console.error(err)
    }


  }
  return (
    <>
      {data.map(entry => {
        const link = `/category/${entry._id}/page/1`;

        return <NavLink
          to={link}
          key={entry._id}
          className="block w-[175px] border-1 border-gray-500 p-2 mb-3 hover:bg-indigo-600 hover:border-1 hover:border-indigo-600 "
        ><span className="pl-2 pr-2 pb-1 pt-1 text-xs font-extrabold rounded-sm bg-white text-black">{entry.count}</span> {entry._id} </NavLink>
      })}
    </>
  )
}

export default CatalogItemsHome
