import { useState } from 'react'

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
            <form className='todo-form' onSubmit={handleTodo}>
                <input type='text' value={newTodo} onChange={(e) => setNewTodo(e.target.value)} style={{marginRight: '1rem'}}/>
                <button>{type}</button>
            </form>
        </>
    )
}

export default Input