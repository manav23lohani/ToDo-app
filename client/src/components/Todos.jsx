import Todo from "./Todo"
import SearchTodo from "./Search"
import { useState, useRef, useEffect } from "react"

function Todos({todos, setUpdatepage, handleNewTodo, handleUpdate}) {
      const [search, setSearch] = useState('')
      const searchRef = useRef(null);

      useEffect(() => {
        setSearch(null);
      }, [todos]);
    
      useEffect(() => {
        if (searchRef.current) {
          searchRef.current.scrollIntoView({
            behavior: "smooth",
            block: "nearest",
          });
        }
      }, [search]);

      return (
    <section className="todos">
           <SearchTodo setSearch={setSearch}  />
        {todos?.map((item, key)=>{
            return <div key={key}
            ref={(el) => {
              if (item?.todo.includes(search)) {
                searchRef.current = el;
              }
            }}
             >
                <Todo handleNewTodo={handleNewTodo} handleUpdate={handleUpdate} setUpdatepage={setUpdatepage} item={item} search={search} />
            </div>
        })}
    </section>
  )
}

export default Todos