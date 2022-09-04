import Alert from './Alert';
import { useEffect, useState } from 'react';
import './App.css';
import Todos from './Todos';
import {Button, Container, Spinner} from 'reactstrap'

const url = 'https://630f26d6498924524a86e8a4.mockapi.io/todos'

function Main({ alert, showAlert, user }) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [isCompleted, setIsCompleted] = useState(false)
  const [todo, setTodo] = useState({ content: '', isCompleted: false, itemId: null })
  const [content, setContent] = useState("")

  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)


  const fetchData = async () => {
    const response = await fetch(url);
    const newTodos = await response.json();
    setTodos(newTodos);
    setLoading(false)

  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <Spinner
        className="m-auto"
        color="primary"
        style={{
          height: '4rem',
          width: '4rem'
        }}
      >
        Loading...
      </Spinner>
      )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent(content)

    if (content.trim().length < 3) {
      showAlert(true, 'Plesa enter', 'danger')
      setContent("")
    }
    else if (isEditing && content) {
      setTodos(todos.map((item) => {
        if (item.id === editId) {
          return { ...todos, content: content }
        }
        return item
      }))
      setContent("")
      setEditId(null)
      setIsEditing(false)
      showAlert(true, 'edited', 'success')
      putTodo(editId, content)

    }
    else {
      const newTodo = { content: content, isCompleted: false, itemId: new Date().getTime().toString() }
      setTodo(newTodo)
      showAlert(true, "New Item Added", "")
      setContent('')
      setTodos([...todos, newTodo])
      dataSaveGet(newTodo)

    }
  }


  const deleteTodo = async (id) => {
    await fetch((`${url}/${id}`),
      {
        method: 'DELETE'
      }
    )
    const response = await fetch(url);
    const news = await response.json();
    console.log(news)
    console.log('datada sili')
  }

  const removeItem = (id) => {
    console.log(todos)
    let removedList = todos.filter((item) => item.id !== id)
    setTodos(removedList);
    showAlert(true, 'Item Remowed', 'success')
    deleteTodo(id)
    console.log(removedList)
  }

  const editItem = (id) => {
    const editingItem = todos.find((item) => item.id === id)
    setContent(editingItem.content)
    setIsEditing(true)
    setEditId(id)

  }
  const completedItem = (id) => {
    const complatedItem = todos.find((item) => item.id === id)
    complatedItem.isCompleted = (!(complatedItem.isCompleted))
    completeTodo(id, complatedItem.isCompleted)

  }

  const dataSaveGet = async (todo) => {
    const post = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          content: todo.content,
          isCompleted: todo.isCompleted
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const response = await fetch(url);
    const news = await response.json();
    setTodos(news)
    console.log('datada get-save')
  }

  const putTodo = async (id, content) => {
    await fetch((`${url}/${id}`),
      {
        method: 'PUT',
        body: JSON.stringify({
          content: content
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
    const response = await fetch(url);
    const news = await response.json();
    setTodos(news)
    console.log('datada put')
  }
  const completeTodo = (id, isCompleted) => {
    fetch((`${url}/${id}`),
      {
        method: 'PUT',
        body: JSON.stringify({
          isCompleted: isCompleted
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json()).catch(err => {
      console.error(err)
    });
    console.log('datada coplated')
  }


  return (<>
    <section className="container bg-light border">
      <form className="header py-5 text-center" onSubmit={handleSubmit} >
        <Alert alert={alert} removeAlert={showAlert} todos={todos} />
        <h3>Todos..</h3>
        <p>Wellcome {user}</p>
        <p>Toplam todo : {todos.length}</p>
        <p>Tamamlanan todo : </p>
        <div className="form-control">
          <input
            type="text"
            className="todo"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder='Todo..'
          />
          <button type="submit" className="submit-btn">
            {isEditing ? "edit" : "submit"}
          </button>
        </div>
      </form>

    </section>
    <section className="container">    <Todos todos={todos} todo={todo} removeItem={removeItem} editItem={editItem} completedItem={completedItem} /></section>

    </>
  )
}

export default Main;
