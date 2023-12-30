import { Search } from "lucide-react";
import { useRef } from "react";

function SearchTodo({ setSearch }) {
  const inpRef = useRef(null);
  function handleSearch(e) {
    e.preventDefault();
    setSearch(inpRef.current.value);
  }

  return (
    <form className="taskform" onSubmit={handleSearch}>
      <Search />

      <input ref={inpRef} type="text" placeholder="search" />
      <button>search</button>
    </form>
  );
}

export default SearchTodo;
