import React from 'react';
import { NavLink } from 'react-router';
import ErrorToast from '/src/components/partials/ErrorToast.jsx';
import useRequest from '/src/hooks/useRequest.js';

const styles = {
  div: 'grid grid-cols-[1fr_1fr_1fr] md:block',
  navLink: 'block mb-0.5 p-1.5 hover:bg-slate-200 hover:text-slate-900 text-slate-700',
  span: 'md:ml-1 mr-2 pl-2 pr-2 pb-1 pt-1 text-xs font-extrabold rounded-sm bg-white text-black border-1 border-gray-400'
}

function CatalogItems() {
  const request = {
    type: "catalog",
  }
  const [response, content, error] = useRequest(request);

  return (
    <>
      {error && <ErrorToast error={error} />}

      <div className={styles.div}>
        {response.message && response.message.map(entry => {

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
