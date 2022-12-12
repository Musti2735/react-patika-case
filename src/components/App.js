import { useState, useEffect } from 'react';
import Main from '../pages/Main'
import Alert from '../components/Alert';
import '../style/main.css'
import DarkMode from './DarkMode';
import {ThemeContext} from '../context/ThemeContext';


function App() {
    const [user, setUser] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [alert, setAlert] = useState({ show: true, msg: "", type: '' });
    const [mode, setMode] = useState('light')

    const handleMode = () => {
        const newMode = mode === 'light' ? 'dark' : 'light'
        setMode(newMode)
        localStorage.setItem('mode', JSON.stringify(newMode));
    }
    const data = { mode, handleMode }
  
    useEffect(() => {
        document.body.className = mode
      }, [mode])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.trim().length < 3) {
            showAlert(true, ' Must be at least 3 characters long.', 'dark')
            setUser("")

        } else {
            setIsUser(true)
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user));

        }
    }
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user'));
        const localMode = JSON.parse(localStorage.getItem('mode'));
        setUser(localData)
        setMode(localMode)
    }, []);

    const showAlert = (show = false, msg = "", type = '') => {
        setAlert({ show, msg, type })
    }



    if (isUser && user.trim().length >= 3) {
        return  <ThemeContext.Provider value={data}><div><Main user={user} alert={alert} showAlert={showAlert} mode={mode} handleMode={handleMode} /></div></ThemeContext.Provider>
    }

    return (
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
