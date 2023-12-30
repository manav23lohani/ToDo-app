import Input from './Input'
import { X } from 'lucide-react'
import { useState } from 'react'

function Modal({ onClose, isOpen, handleNewTodo, item, handleUpdate }) {
    const [status, setStatus] = useState(item.status);
    return (
        <>
            {isOpen && <section className='modal'>
                <div className='modal-dialogue'>
                    <X className='x' onClick={onClose} />
                    <div style={{marginBottom:'1rem'}}>
                    <span style={{fontSize:'.9rem'}}>status: </span>
                    <select onChange={(e)=>setStatus(e.target.value)} name="status" id="status">
                        <option value={status}>{status}</option>
                        {status != "pending" && <option value="pending">pending</option>}
                        {status != "ongoing" && <option value="ongoing">ongoing</option>}
                        {status != "completed" && <option value="completed">completed</option>}
                    </select>
                    </div>
                    <Input onClose={onClose} status={status} handleUpdate={handleUpdate} handleNewTodo={handleNewTodo} type={'update'} item={item} />
                </div>
            </section>}
        </>
    )
}

export default Modal