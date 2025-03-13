import { useEffect, useRef } from "react"
import { useNavigate } from "react-router";

function SearchInputField() {
  const timeoutId = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  const onInputChangeHandler = (e) => {
    const searchValue = e.target.value;

    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    timeoutId.current = setTimeout(() => {

      // If the search value is empty load go back to previous view.
      !searchValue.trim() ?
        navigate(-1) :

        navigate('/search', { state: { "searchValue": searchValue } });
    }, 300);

  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key == 'k') {
        event.preventDefault();
        if (searchInputRef.current) {
          searchInputRef.current.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const styles = {
    input: "w-full rounded-md py-2 ps-3 pe-10 bg-white text-sm shadow-xs focus:outline-none focus:border-none text-center text-xs tracking-widest",
    span: "absolute end-1 inset-y-0 grid w-7 place-content-center",
    button: "text-gray-800"
  }

  return (
    <>
      <div className="relative">
        <input
          type="text"
          id="search"
          name="search"
          onChange={onInputChangeHandler}
          placeholder="Search (Ctrl+K)"
          ref={searchInputRef}
          autoComplete="off"
          className={styles.input}
        />

        <span className={styles.span}>
          <button
            type="button"
            className={styles.button}
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
