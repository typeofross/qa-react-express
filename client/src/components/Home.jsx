import React, { useState, useEffect } from 'react';
import services from '/services/fetch.js';
import ListItems from '/src/components/partials/ListItems.jsx';
import CatalogItems from '/src/components/partials/CatalogItems.jsx';

const styles = {
  div1: "grid grid-cols-1 md:grid-cols-[200px_auto] gap-3",
  div2: "md:border-r-1 border-1 border-gray-200 rounded-lg md:h-[75%] md:sticky md:top-0 bg-gradient-to-t from-slate-100 to-slate-50",
  p: "text-xs mb-5"
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
        <div>
          <p className={styles.p}>NEWEST POSTS:</p>
          {data.map(item =>
            <ListItems
              key={item._id}
              item={item}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default Home;