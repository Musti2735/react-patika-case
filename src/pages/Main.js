import Alert from '../components/Alert';
import { useEffect, useState, useContext } from 'react';
import '../style/main.css';
import Todos from '../components/Todos';
import DarkMode from '../components/DarkMode';
import { ThemeContext } from "../context/ThemeContext";


const url = 'https://630f26d6498924524a86e8a4.mockapi.io/todos'

function Main({ alert, showAlert}) {
  const [loading, setLoading] = useState(true); // giriş sayfasından, ana sayfaya giriş yapılana kadar ekranda loading öğesi için tanımlama yaptık.
  const [todos, setTodos] = useState([]); //todo öğeleri için boş bir liste tanımladık
  const [todo, setTodo] = useState({ content: '', isCompleted: false, itemId: null, checked:'none' }) //todo öğesini bir nesne olarak tanımladık. Todo'nun içerik, tamamlanma ve id değişkenleri olacak.
  const [content, setContent] = useState("") // inputa girilen içeriği almak için content değetini ayrıca tanımladık.
  const [isEditing, setIsEditing] = useState(false) // todo düzenleneceği zaman düzenleme işlemi için tanımlama yaptık
  const [editId, setEditId] = useState(null)

  const {mode, user} = useContext(ThemeContext) // context ile aktatılan mode ve user değerlerini Main içine aldık.

  const fetchData = async () => { //asenkron fonksiyon içinde fetch kullanarak datamızı response ettik.
    const response = await fetch(url);
    const newTodos = await response.json();
    setTodos(newTodos);
    setLoading(false);
  }

  useEffect(() => {
    fetchData();
  }, []); 

  if (loading) { //loading için dönen öğe tanımladık
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border" role="status"> </div>
      </div>
    )
  };

  const handleSubmit = (e) => { //todo ile ilgili tüm operasyonları gerçekleştirecek olan fonksiyonu tanımladık.
    e.preventDefault();
    setContent(content)

    if (content.trim().length < 3) { // içerik üç karekterden az ise uyarı gösterdik.
      showAlert(true, 'Must be at least 3 characters long.', 'dark') //alert fonksiyonunu çağırdık ve parametrelerini girdik
      setContent("") // içeriği boş karekter olarak tanımladık.
    }
    else if (isEditing && content) { // eğer isEditing true ise ve içerik var ise yani todo editleniyorsa
      setTodos(todos.map((item) => { // düzenlenen öğeyi id ile bulup contentini değiştiriyoruz. todos listesi içinde tüm todos öğelerini kopyaladık ve contentini değiştirdik.
        if (item.id === editId) {
          return { ...todos, content: content }
        }
        return item
      }))
      setContent("") // inputu sıfırladık.
      setEditId(null) // değeri tekrar null değerine getirdik
      setIsEditing(false) // değeri tekrar false değerine getirdik
      showAlert(true, 'Item edited successfuly', 'dark') // alert fonksiyonunu çalıştırdık
      putTodo(editId, content) // değişen değeri dataya put ettik.
    }
    else { //eğer yeni todo ekleniyotsa
      const newTodo = { content: content, isCompleted: false, itemId: new Date().getTime().toString(), checked:'none' } // yeni bir todo öğesi tanımladık, id'sini uniqe bir değer olarak verdik.
      setTodo(newTodo) //todoyu set ettik
      showAlert(true, "New item added successfuly", "dark") //alert fonksiyonunu çağırdık
      setContent('') //inputu sıfırladık.
      setTodos([...todos, newTodo]) //todo listesine yeni öğreyi ekledik.
      dataSaveGet(newTodo) // yeni değeri dataya post ettik.

    }
  }


  const removeItem = (id) => { //silinecek öğe için fonksiyon tanımladık
    let removedList = todos.filter((item) => item.id !== id) // filter methodu ile id 'nin eşleşmediği diğer tüm öğeler ile yeni bir liste oluşturduk. id'si eşleşen yani remove edilen öğe çıkarılmış oldu.
    setTodos(removedList); //todo listeine, bu yeni liste değerini set ettik.
    showAlert(true, 'Item remowed successfuly', 'dark')
    deleteTodo(id) //datadan ilgili id'ye sahip öğreyi delete ettik.
  }

  const editItem = (id) => { // editlenecek öğe için fonksiyon tanımladık
    const editingItem = todos.find((item) => item.id === id) // find methodu ile editlenen öğeyi bulduk
    setContent(editingItem.content)//içeriği set ettik
    setIsEditing(true)
    setEditId(id)
  }

  let completedTodo = todos.filter(todo => todo.isCompleted === true) // sayfada tamamlanan öğre sayısını göstermek için tamamlanan öğeleri filter methodu ile bulduk 

  const completedItem = (id) => { // butona tıklandığında ilgili öğeyi tamamlanan yapmak için fonksiyon oluşturduk
    const complatedItem = todos.find((item) => item.id === id)
    complatedItem.isCompleted = (!(complatedItem.isCompleted))
    completeTodo(id, complatedItem.isCompleted)

  }

  const dataSaveGet = async (todo) => { //todo öğresini database'e post eden fonksiyon
    const post = await fetch(url,
      {
        method: 'POST',
        body: JSON.stringify({
          content: todo.content,
          isCompleted: todo.isCompleted,
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

  const putTodo = async (id, content) => { // değişen todo öğresini database'e put eden fonksiyon
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
  const completeTodo = (id, isCompleted) => {// tamamlanan todo öğresini database'e put eden fonksiyon
    fetch((`${url}/${id}`),
      {
        method: 'PUT',
        body: JSON.stringify({
          isCompleted: isCompleted,
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      }
    ).then((response) => response.json()).catch(err => {
      console.error(err)
    });

  }

  const deleteTodo = async (id) => { // silinen todo öğresini database'den silen fonksiyon
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
                  <td>{completedTodo.length}</td>
                  <td>{todos.length - completedTodo.length}</td>
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
