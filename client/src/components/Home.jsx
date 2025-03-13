import React from 'react';
import ListItems from '/src/components/partials/ListItems.jsx';
import CatalogItems from '/src/components/partials/CatalogItems.jsx';
import NoPostsToShow from '/src/components/partials/NoPostsToShow.jsx';
import ErrorToast from '/src/components/partials/ErrorToast.jsx';
import useRequest from '/src/hooks/useRequest.js';

const styles = {
  div1: "grid grid-cols-1 md:grid-cols-[200px_auto] h-full gap-3",
  div2: "md:border-r-1 border-1 border-gray-200 rounded-lg md:overflow-y-auto custom-scrollbar md:h-full bg-gradient-to-t from-slate-100 to-slate-50",
  div3: "md:overflow-y-auto custom-scrollbar",
}
function Home() {
  const request = {
    type: "latest",
  }
  const [response, content, error] = useRequest(request);

  return (
    <>
      <title>Home</title>
      <div className={styles.div1}>
        <div className={styles.div2}>
          <CatalogItems />
        </div>
        <div className={styles.div3}>

          {error && <ErrorToast error={error} />}

          {!content && <NoPostsToShow />}

          {response.message && response.message.map(item =>
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