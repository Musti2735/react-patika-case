import './todos.css'
import { FaCheck, FaCircle, FaEdit, FaTrash } from 'react-icons/fa'
import { useState } from 'react'

function Todos({ todos, removeItem, editItem, completedItem }) {
    const [status, setStatus] = useState("all")
    let completedTodos = todos.filter((item) => item.isCompleted === true)
    let unCompletedTodos = todos.filter((item) => item.isCompleted === false)
    let curruentTodos = status === 'all' ? todos : status === 'completed' ? completedTodos : unCompletedTodos

    return (<>

        <div className='lists' >
            <h5 onClick={() => setStatus('all')} className={status==='all' ? 'listsBtnClicked' : 'listsBtn'}>All To Do's</h5>
            <h5 onClick={() => setStatus('completed')} className={status==='completed' ? 'listsBtnClicked' : 'listsBtn'}>Completed</h5>
            <h5 onClick={() => setStatus('unCompleted')} className={status==='unCompleted' ? 'listsBtnClicked' : 'listsBtn'}>Uncompleted </h5>
        </div>

        
        <table class="table table-md">
            <thead>
                <tr>
                    <th className='col-1' scope="col">#</th>
                    <th className='col-9' scope="col">To Do's</th>
                    <th className='col-2' scope="col"></th>
                </tr>
            </thead>
            <tbody>
                {curruentTodos.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{index+1}</td>
                            <td className={item.isCompleted == true ? 'checked' : 'unchecked'} > {item.content} </td>
                            <td>
                                <div class="btn-group" role="group" aria-label="Basic example">
                                    <FaTrash className="btns" onClick={() => removeItem(item.id)} />
                                    <FaEdit className="btns" onClick={() => editItem(item.id)} />
                                    {item.isCompleted == true ?  <FaCircle className="btns" onClick={() => completedItem(item.id)}/> :<FaCheck className="btns" onClick={() => completedItem(item.id)}/>}
                             
                                </div>
                            </td>
                        </tr>
                    )
                })}
            </tbody>
        </table>
    </>
    );

}

export default Todos;