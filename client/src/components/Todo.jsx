import { Pencil, Trash2 } from "lucide-react"
import { useState } from "react"
import api from "../api"
import Modal from "./Modal"

function statusColor(text){
   if(text == 'ongoing'){
      return 'yellow'
   }
   else if(text == 'completed'){
      return 'green'
   }
   else{
    return 'orange'
   }
}

function Todo({item, setUpdatepage, handleUpdate, handleNewTodo}) {
    const [lineThrough, setLineThrough] = useState(false)
    const [modalOpen, setModalOpen] = useState(false) //initial sync with db

    function isOpen(){
      setModalOpen(true)
    }
    function onClose(){
      setModalOpen(false)
    }
    function handleCompletion(){
        setLineThrough((x)=>!x)
    }
    async function handleDelete(ID){
      //onclicking check item id to send
      const res = await api.delete(`/todo/${ID}`)
      setUpdatepage((y)=>y+1)

    }

  return (
    <div className={`${lineThrough? 'completed-task': ''} todo`}>
        <span onClick={handleCompletion} style={{textDecoration:item?.status=='completed'?'line-through': '', opacity:item?.status=='completed'?'.3': '1'}} className={`${lineThrough? 'line-through': ''} todo-content`}>{item?.todo}</span>
        <div className="todo-info">
          <span style={{color: statusColor(item?.status)}}>{item?.status}</span>
          <Trash2 onClick={()=>handleDelete(item.ID)} className="trash"/>
          <Pencil className="edit" onClick={isOpen}/>
          <Modal handleNewTodo={handleNewTodo} handleUpdate={handleUpdate} item={item} isOpen={modalOpen} onClose={onClose} />
        </div>
        
    </div>
  )
}

export default Todo