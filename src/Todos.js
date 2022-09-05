import './todos.css'
import { useState } from 'react'
import { FaCheck, FaCheckCircle, FaEdit, FaFlagCheckered, FaTrash } from 'react-icons/fa'

function Todos({ todos, todo, removeItem, editItem, completedItem }) {


    return (<>
        <table class="table table-md">
            <thead>
                <tr>
                    <th className='col-1' scope="col">#</th>
                    <th className='col-9' scope="col">To Do's</th>
                    <th className='col-2' scope="col"></th>

                </tr>
            </thead>


            <tbody>
                {todos.map((item, index) => {
                    return (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td className={item.isCompleted == true ? 'checked' : 'unchecked'} > {item.content} </td>
                            <td>
                            <div class="btn-group" role="group" aria-label="Basic example">
                                <FaTrash   className="btns" onClick={() => removeItem(item.id)} />
                                <FaEdit  className="btns" onClick={() => editItem(item.id)} />
                                <input type='checkbox'  className="btns" onClick={() => completedItem(item.id)} ></input>
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