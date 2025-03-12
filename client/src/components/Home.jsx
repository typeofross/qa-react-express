import React, { useState, useEffect } from 'react';
import services from '/services/fetch.js';
import ListItems from '/src/components/partials/ListItems.jsx';
import CatalogItems from '/src/components/partials/CatalogItems.jsx';
import NoPostsToShow from '/src/components/partials/NoPostsToShow.jsx';
import ErrorToast from './partials/ErrorToast.jsx';

const styles = {
  div1: "grid grid-cols-1 md:grid-cols-[200px_auto] h-full gap-3",
  div2: "md:border-r-1 border-1 border-gray-200 rounded-lg md:overflow-y-auto custom-scrollbar md:h-full bg-gradient-to-t from-slate-100 to-slate-50",
  div3: "md:overflow-y-auto custom-scrollbar",
}
function Home() {
  const [data, setData] = useState([]);
  const [msg, setMsg] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    getLatest()
  }, [])

  const getLatest = async () => {
    try {
      const response = await services.get('latest');

      if (response.status === 204) {
        return setMsg(true);
      }

      if (response.status !== 'success') {
        throw new Error(response.message)
      }

      setData(response.message);

    } catch (err) {
      console.error(err)

      if (!data.message) {
        setError(err.message);
      }
    }

  }

  return (
    <>
      <title>Home</title>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <CatalogItems setError={setError} />
        </div>
        <div className={styles.div3}>

          {msg && <NoPostsToShow />}

          {error && <ErrorToast error={error} />}

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