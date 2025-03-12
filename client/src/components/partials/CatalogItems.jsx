import React, { useState, useEffect } from 'react';
import services from '/services/fetch.js';
import { NavLink } from 'react-router';

const styles = {
  div: 'grid grid-cols-[1fr_1fr_1fr] md:block',
  navLink: 'block mb-0.5 p-1.5 hover:bg-slate-200 hover:text-slate-900 text-slate-700',
  span: 'md:ml-1 mr-2 pl-2 pr-2 pb-1 pt-1 text-xs font-extrabold rounded-sm bg-white text-black border-1 border-gray-400'
}

function CatalogItems({ setError }) {
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
      setError(err.message);
    }
  }

  return (
    <>
      <div className={styles.div}>
        {data.map(entry => {

          return <div key={entry._id}>
            <NavLink
              to={`/category/${entry._id}/page/1`}
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
