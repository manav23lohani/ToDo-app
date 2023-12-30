import Todo from "./Todo"

const todo = ['dorce far nienta']
function Todos({todos, setUpdatepage, handleNewTodo, handleUpdate}) {

  return (
    <section className="todos">
        {todos?.map((item, key)=>{
            return <div key={key}>
                <Todo handleNewTodo={handleNewTodo} handleUpdate={handleUpdate} setUpdatepage={setUpdatepage} item={item} />
            </div>
        })}
    </section>
  )
}

export default Todos