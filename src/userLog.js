import React, { useState } from 'react';
import PropTypes from 'prop-types';

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