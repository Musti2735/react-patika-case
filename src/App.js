import { useState, useEffect } from 'react';
import './App.css';
import Main from './Main'
import Alert from './Alert';
import { Form, Button, Input, Label, Col, Container, Row } from 'reactstrap'


function App() {
    const [user, setUser] = useState("")
    const [isUser, setIsUser] = useState(false)
    const [alert, setAlert] = useState({ show: true, msg: "", type: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (user.trim().length < 4) {
            showAlert(true, ' Must be at least 4 characters long.', 'danger')
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

    if (isUser && user.trim().length >= 4) {
        return <div><Main user={user} alert={alert} showAlert={showAlert} /></div>
    }
    return (
        <Container className=" container bg-light border"
            fluid="sm">



            <Col>
                <div className='header py-5 text-center'>
                    <h2>To Do App</h2>
                    <p className='lead'>You can create own todo list</p>
                </div>
            </Col>
            <Col>

                <form onSubmit={handleSubmit} className='py-3' >
                    <div className="lead row-cols-lg-auto align-items-center">
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
                        <button className='btn btn-dark' type='submit'>
                            Login
                        </button>
                    </div>
                </form>
                <div>
                    <Alert alert={alert} removeAlert={showAlert} /></div>
            </Col>

        </Container>

    )
}

export default App;
