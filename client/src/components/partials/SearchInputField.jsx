import { useRef, useEffect } from "react"
import { useNavigate } from "react-router";

function SearchInputField(props) {
  const inputRef = useRef(null);
  const timeoutId = useRef(null);
  const navigate = useNavigate();

  // Checks if it should be focused and sets the value.
  useEffect(() => {
    if (props.focused && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.value = props.searchValue ?? "";
    }
  }, [props.focused]);

  const onInputChangeHandler = (e) => {
    const searchValue = e.target.value;

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {

      // If the search value is empty load Home component
      !searchValue.trim() ?
        navigate('/', { state: { from: 'search' } }) :

        // Otherwise if search is not initiated from Home, send back props from Child (this) to parent (Search)
        !props.fromHome ? props.onDataChange(searchValue) :

          // Or, if it's initiated from Home, load Search component and pass the state of the search value.
          navigate('/search', { state: { "searchValue": searchValue } });
    }, 300);

  }

  return (
    <>
      <div className="relative">
        <input
          type="text"
          id="search"
          name="search"
          onChange={onInputChangeHandler}
          placeholder="Search for posts..."
          autoComplete="off"
          className="w-full rounded-md py-2 ps-3 pe-10 border-white bg-gray-900 text-xs"
          ref={inputRef}
        />

        <span className="absolute end-1 inset-y-0 grid w-7 place-content-center">
          <button
            type="button"
            className="text-gray-500"
          >

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.608 10.607z"
              />
            </svg>
          </button>
        </span>
      </div>
    </>
  )
}

export default SearchInputField
