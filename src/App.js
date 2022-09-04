import { useState, useEffect } from 'react';
import './App.css';
import Main from './Main'
import Alert from './Alert';



function App() {
    const [user, setUser] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [alert, setAlert] = useState({ show: false, msg: "", type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.trim().length < 3) {
            showAlert(true, 'Please enter your name', 'success')
            setUser("")
        } else {
            setIsUser(true)
            console.log(user)
            localStorage.setItem('user', JSON.stringify(user));
        }
    }
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('user'))
        setUser(localData)
    }, []);

    const showAlert = (show = false, msg = "", type = '') => {
        setAlert({ show, msg, type })
    }

    if (isUser && user.trim().length > 3) {
        return <div><Main user={user} alert={alert} showAlert={showAlert} /></div>
    }
    return (
        <section className="section-center">
            <div className="login-wrapper">
                <Alert alert={alert} showAlert={showAlert} />
                <h1>Please Log In</h1>
                <form onSubmit={handleSubmit} >
                    <label>
                        <p>Username</p>
                        <input
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                            type="text" />
                    </label>
                    <div>
                        <button type="submit">Submit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default App;
