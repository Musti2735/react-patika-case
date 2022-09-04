import './todos.css'
import { useState } from 'react'

function Todos({ todos, todo, removeItem, editItem, completedItem }) {


    return (
        <div className="App">
            {todos.map((item, index) => {
                return (
                    <li key={index}>
                        <p className={item.isCompleted == true ? 'checked' : 'unchecked'} > {item.content} </p>
                        <button onClick={() => removeItem(item.id)}>Delete</button>
                        <button onClick={() => editItem(item.id)} >Edit</button>
                        <button onClick={() => completedItem(item.id)} >Completed</button>
                    </li>
                )
            })}
        </div>
    );

}

export default Todos;