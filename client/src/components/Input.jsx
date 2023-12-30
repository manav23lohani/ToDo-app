import { useState } from 'react'
import { Plus } from 'lucide-react'

function Input({ handleNewTodo, type, item, handleUpdate, status, onClose }) {
    const [newTodo, setNewTodo] = useState(item?.todo)
    async function handleTodo(e) {
        e.preventDefault()
        if (type == 'add') {
            if (newTodo.trim() == '') return alert('add some work to do')
            try {
                await handleNewTodo(newTodo)
                setNewTodo('')
            } catch (err) {
                console.log(err)
            }
        }
        if(type=='update'){
            if (newTodo.trim() == '') return alert('add some work to do')
            try {
                await handleUpdate(newTodo, item?.ID, status)
                setNewTodo('')
                onClose()
            } catch (err) {
                console.log(err)
            }
        }
    }

    return (
        <>
            <form className='taskform' onSubmit={handleTodo}>
            <Plus />
                <input type='text' value={newTodo} placeholder= 'task' onChange={(e) => setNewTodo(e.target.value)}/>
                <button>{type}</button>
            </form>
        </>
    )
}

export default Input