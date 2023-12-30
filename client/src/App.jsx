import { useEffect, useState } from 'react'
import Input from './components/Input'
import Todos from './components/Todos'
import api from './api'
import './App.css'


function App() {
  const [todos, setTodos] = useState(null)
  const [updatepage, setUpdatepage] = useState(0)
  const handleNewTodo = async (newTodo) => {

    try {
      const res = await api.post('/todo', { todo: newTodo, status:'pending' })
      setUpdatepage((y)=>y+1)
      
    } catch (err) {
      console.log(err)
    }
  }
  const handleUpdate = async (newTodo, ID, status) => {
    try {
      const res = await api.put(`/todo/${ID}`, { todo: newTodo, status:status })
     
      setUpdatepage((y)=>y+1)
      
    
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    const getTodo = async () => {
      try {
        const res = await api.get('/todo')
        setTodos(res.data.data)
      } catch (err) {
      }
    }
    getTodo()
  }, [updatepage])


  return (
    <main>
      <h1 style={{ textAlign: 'center', marginBottom: '2rem' }}>To-Do Tasks</h1>
      <Input handleNewTodo={handleNewTodo} type={'add'} item={{todo: ''}} handleUpdate={handleUpdate} />
      <Todos todos={todos} setUpdatepage={setUpdatepage} handleNewTodo={handleNewTodo} handleUpdate={handleUpdate} />
    </main>
  )
}

export default App