import { useState, useEffect } from 'react';
import Main from '../pages/Main'
import Alert from '../components/Alert';
import '../style/main.css'
import DarkMode from './DarkMode';
import {ThemeContext} from '../context/ThemeContext';


function App() {
    const [user, setUser] = useState("") //Kullanıcı tanımlama
    const [isUser, setIsUser] = useState(false) // Kullanıcı doğrulaması için tanımlama
    const [alert, setAlert] = useState({ show: true, msg: "", type: '' }); // input için uyarı tanımlama
    const [mode, setMode] = useState('light') // ligth-dark mode için tema tanımlama

    const handleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light'
        setMode(newMode)
        localStorage.setItem('mode', JSON.stringify(newMode));
    } // dark mode için handleMode adında bir fonksiyon oluşturduk. Bu fonksiyon mode değişkeninin değerini değiştiren ve localStorage'a kaydeden bir fonksiyon.


    const data = { mode, handleMode, user } // user değeri, mode değeri ve modu değiştiren fonksiyonu uygulamada tüm componentlerde context yapısı ile aktaracağımız için data değişkenine atadık. 
  
    useEffect(() => {
        document.body.className = mode
      }, [mode]) // body'nin classını mode değeri olarak atadık

    const handleSubmit = (e) => { //Kullanıcı girişi için buton tıklandığında çalışacak fonksiyon. 
        e.preventDefault();
        if (user.trim().length < 3) { //Eğer kullanıcı adı uzunluğu üçten azdır.
            showAlert(true, ' Must be at least 3 characters long.', 'dark')
            setUser("")

        } else { // değilse kullanıcıyı doğruladık ve locale kaydettik
            setIsUser(true)
            localStorage.setItem('user', JSON.stringify(user));

        }
    }
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user')); // localden user ve mode değerlerini getirdik ve atamasını yaptık.
        const localMode = JSON.parse(localStorage.getItem('mode'));
        setUser(localData)
        setMode(localMode)
    }, []);

    const showAlert = (show = false, msg = "", type = '') => {
        setAlert({ show, msg, type }) //alert fonksiyonunu tanımladık
    }

    if (isUser) { // kullanıcı değeri true ise Main componentini return ettik.
        return  <ThemeContext.Provider value={data}><div><Main alert={alert} showAlert={showAlert}   /></div></ThemeContext.Provider>
    }

    return ( // kullanıcı giriş sayfası için html içeriğini return ettik. contexti tüm componentler üzerine sarmaladık.
        <ThemeContext.Provider value={data}>  
        <section className={`container2 ${mode} border lead`}>
            <DarkMode />
            <div className='row'>
                <div className='col-md-6 layer'>
                    <div className='header py-5 text-center'>
                        <h2>To Do App</h2>
                        <p className='lead'>You can create own todo list</p>
                    </div>
                </div>

                <div className='col-md-6 layer'>
                    <form onSubmit={handleSubmit} className='todoForm' >
                        <div>
                            <label className='form-label' size="lg" htmlFor="name">
                                Please Enter Your Name :
                            </label>
                            <input
                                className='form-control'
                                id="name"
                                type="text"
                                value={user}
                                onChange={(e) => setUser(e.target.value)}
                            />
                            <button className={`btn btn-${mode === 'dark' ? 'light' : 'dark'} mb-3`} type='submit'>
                                Login
                            </button>
                            <div>
                                <Alert alert={alert} removeAlert={showAlert} />
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </section>
        </ThemeContext.Provider>
    )
}

export default App;
