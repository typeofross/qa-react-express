import React, { useState, useEffect } from 'react';
import services from '/services/fetch.js';
import { NavLink } from 'react-router';

const styles = {
  div: 'grid grid-cols-[1fr_1fr_1fr] md:block',
  navLink: 'block mb-0.5 p-1.5 hover:bg-indigo-600 hover:text-white',
  span: 'mr-2 pl-2 pr-2 pb-1 pt-1 text-xs font-extrabold rounded-sm bg-white text-black border-1 border-gray-400'
}

function CatalogItems() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getCatalog()
  }, [])

  const getCatalog = async () => {
    try {
      const response = await services.get('catalog');
      if (response.status !== 'success') {
        throw new Error(response.message)
      }
      setData(response.message);
    }
    catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className={styles.divContainer}>
        {data.map(entry => {
          const link = `/category/${entry._id}/page/1`;

          return <div>
            <NavLink
              to={link}
              key={entry._id}
              className={styles.navLink}
            >
              <span className={styles.span}>{entry.count}</span> {entry._id}
            </NavLink></div>
        })}
      </div>
    </>
  )
}

export default CatalogItems
