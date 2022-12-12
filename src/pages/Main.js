import Alert from '../components/Alert';
import { useEffect, useState, useContext } from 'react';
import '../style/main.css';
import Todos from '../components/Todos';
import DarkMode from '../components/DarkMode';
import { ThemeContext } from "../context/ThemeContext";


const url = 'https://630f26d6498924524a86e8a4.mockapi.io/todos'

function Main({ alert, showAlert, user}) {
  const [loading, setLoading] = useState(true);
  const [todos, setTodos] = useState([]);
  const [todo, setTodo] = useState({ content: '', isCompleted: false, itemId: null })
  const [content, setContent] = useState("")
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const {mode, handleMode} = useContext(ThemeContext)

  const fetchData = async () => {
    const response = await fetch(url);
    const newTodos = await response.json();
    setTodos(newTodos);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status"> </div>
      </div>
    )
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setContent(content)

    if (content.trim().length < 3) {
      showAlert(true, 'Must be at least 3 characters long.', 'dark')
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
      showAlert(true, 'Item edited successfuly', 'dark')
      putTodo(editId, content)
    }
    else {
      const newTodo = { content: content, isCompleted: false, itemId: new Date().getTime().toString() }
      setTodo(newTodo)
      showAlert(true, "New item added successfuly", "dark")
      setContent('')
      setTodos([...todos, newTodo])
      dataSaveGet(newTodo)

    }
  }


  const removeItem = (id) => {
    console.log(todos)
    let removedList = todos.filter((item) => item.id !== id)
    setTodos(removedList);
    showAlert(true, 'Item remowed successfuly', 'dark')
    deleteTodo(id)
    console.log(removedList)
  }

  const editItem = (id) => {
    const editingItem = todos.find((item) => item.id === id)
    setContent(editingItem.content)
    setIsEditing(true)
    setEditId(id)
  }

  let compledetTodos = todos.filter(todo => todo.isCompleted === true)

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

  }

  const deleteTodo = async (id) => {
    await fetch((`${url}/${id}`),
      {
        method: 'DELETE'
      }
    )
    const response = await fetch(url);
    const news = await response.json();
  }

  return (<>
    <section className={`container2 ${mode} border lead`}>
      <DarkMode />
      <div className='row'>
        <div className='col-md-6 layer'>
          <div className='info'>
            <h3><span>TO DO LIST</span></h3>
            <h4><span>Welcome {user}</span></h4>
            <table className={`table table-${mode}`}>
              <thead>
                <tr >
                  <th className='lead' scope="col">All</th>
                  <th className='lead' scope="col">Completed</th>
                  <th className='lead' scope="col">Uncompleted </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>{todos.length}</td>
                  <td>{compledetTodos.length}</td>
                  <td>{todos.length - compledetTodos.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className='col-md-6 layer'>
          <form className="todoForm" onSubmit={handleSubmit} >
            <div>
              <textarea type="textarea"
                className="todo"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows='5'
                placeholder='To do ...' aria-label="With textarea"></textarea>
              <div>
                <button type="submit" className={`btn btn-${mode === 'dark' ? 'light' : 'dark'} mb-3`}>
                  {isEditing ? "Edit" : "Add"}
                </button>
              </div>

              <div className='alertDiv'>
                <Alert alert={alert} removeAlert={showAlert} todos={todos} />
              </div>

            </div>
          </form>
        </div>
      </div>
      {todos.length > 0 && (

        <Todos todos={todos} todo={todo} removeItem={removeItem} editItem={editItem} completedItem={completedItem} mode={mode} />

      )}
    </section>

  </>
  )
}

export default Main;