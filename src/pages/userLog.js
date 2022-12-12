import React from 'react';

function Login({ setUser }) {
  return (
    <div className="login-wrapper">
      <h1>Please Log In</h1>
      <form>
        <label>
          <p>Username</p>
          <input onSubmit={(e) => setUser(e.target.value)} type="text" />
        </label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
    </div>
  )
}

export default Login;