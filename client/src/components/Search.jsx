import { useLocation } from "react-router";
import ListItems from "/src/components/partials/ListItems.jsx";
import NoPostsToShow from "/src/components/partials/NoPostsToShow.jsx";
import ErrorToast from "/src/components/partials/ErrorToast.jsx";
import useRequest from "/src/hooks/useRequest.js";

function Search() {
  const location = useLocation();
  let searchValue = location.state?.searchValue;

  const request = {
    "type": "search",
    data: {
      p1: searchValue
    },
    state: searchValue
  }
  const [response, content, error] = useRequest(request);

  return (
    <>
      <title>Search</title>

      {error && <ErrorToast error={error} />}

      {!content && <NoPostsToShow />}

      {response.message && response.message.map(item =>
        <ListItems
          key={item._id}
          item={item}
        />
      )}
    </>
  )
}

export default Search
