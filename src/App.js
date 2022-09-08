import { useState, useEffect } from 'react';
import Main from './Main'
import Alert from './Alert';
import './main.css'


function App() {
    const [user, setUser] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [alert, setAlert] = useState({ show: true, msg: "", type: '' });

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

        setUser(localData)
    }, []);

    const showAlert = (show = false, msg = "", type = '') => {
        setAlert({ show, msg, type })
    }

    if (isUser && user.trim().length >= 4) {
        return <div><Main user={user} alert={alert} showAlert={showAlert} /></div>
    }
    return (
        <section className="container bg-light border lead">
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
                            <button className='btn btn-dark mt-3 mb-3' type='submit'>
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

    )
}

export default App;
