import React, { useState, useEffect } from 'react';
import services from '../../services/fetch.js';
import ListItems from './partials/ListItems.jsx';
import CatalogItems from './partials/CatalogItems.jsx';

const styles = {
  div1: "grid grid-cols-1 md:grid-cols-[200px_auto] mt-8 gap-3",
  div2: "md:border-r-1 md:border-gray-200",
  div3: "mt-5 md:mt-0",
  p: "text-xs mb-4"
}
function Home() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getLatest()
  }, [])

  const getLatest = async () => {
    try {
      const response = await services.get('latest');

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
      <div className={styles.div1}>
        <div className={styles.div2}>
          <CatalogItems />
        </div>
        <div className={styles.div3}>
          <p className={styles.p}>NEWEST POSTS:</p>
          {data.map(entry =>
            <ListItems key={entry._id} entry={entry} />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;