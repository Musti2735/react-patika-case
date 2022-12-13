import '../style/todos.css'
import { FaCheck, FaCircle, FaEdit, FaTrash } from 'react-icons/fa'
import { useState } from 'react'

function Todos({ todos, removeItem, editItem, completedItem, mode }) {
    const [status, setStatus] = useState("all")
    let completedTodos = todos.filter((item) => item.isCompleted === true)
    let unCompletedTodos = todos.filter((item) => item.isCompleted === false)
    let curruentTodos = status === 'all' ? todos : status === 'completed' ? completedTodos : unCompletedTodos

    // tüm, tamamlanan ve tamamlanmayan öğeleri, filter methodu ile filtreledik ve butona tıklandığında ilgili listeyi gösteren fonksyon atamalarını aşağıda tanımladık.

    return (<>
        <div className='lists' > 
            <h6 onClick={() => setStatus('all')} className={status === 'all' ? 'listsBtnClicked' : 'listsBtn'}>All To Do's</h6>
            <h6 onClick={() => setStatus('completed')} className={status === 'completed' ? 'listsBtnClicked' : 'listsBtn'}>Completed</h6>
            <h6 onClick={() => setStatus('unCompleted')} className={status === 'unCompleted' ? 'listsBtnClicked' : 'listsBtn'}>Uncompleted </h6>
        </div>
        <div className={`container container-lg ${mode}`}>
            <div className='row todo'>
                <h5 className='col-1' scope="col">#</h5>
                <h5 className='col-9' scope="col">To Do's</h5>
                <h5 className='col-2' scope="col"></h5>
            </div>
            <div className='todos'>
                {curruentTodos.map((item, index) => {
                    return (
                        <li key={index} className='row todo'>
                            <div className='col-1'>{index + 1}</div>
                            <div className={`col-9 ${item.isCompleted == true ? 'checked' : 'none'}`}> {item.content} </div>
                            <div className='col-2'>
                                <div className="btn-group" role="group" aria-label="Basic example">
                                    <FaTrash className="btns" onClick={() => removeItem(item.id)} />
                                    <FaEdit className="btns" onClick={() => editItem(item.id)} />
                                    {item.isCompleted == true ? <FaCircle className="btns" onClick={() => completedItem(item.id)} /> : <FaCheck className="btns" onClick={() => completedItem(item.id)} />}
                                </div>
                            </div>
                        </li>
                    )
                })}
            </div>
        </div>
    </>
    );

}

export default Todos;