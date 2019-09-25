import React, { useState } from "react";
import axios from "axios";

import './Login.scss';

const Login = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const sendCredentials = e => {
    e.preventDefault();

    const credentials = {
        "username": username,
        "password": password
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/login/`, credentials)
    .then(res => {
        localStorage.setItem("key", res.data.key)
        props.history.push("/game")
      });
  }

  return (
    <div className="login-container">
        <div className="login">
            <h2>Log in</h2>
            <form onSubmit={e => sendCredentials(e)}>
                <input
                    id="username"
                    value={username}
                    placeholder="Username"
                    onChange={e => setUsername(e.target.value)}
                />
                <input
                    id="password"
                    type="password"
                    value={password}
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                />
                <button onClick={e => sendCredentials(e)}>Submit</button>
        </form>
        </div>
        <div className="signup">
            <p>Don't have an account? <a href="/register">Sign up</a></p>
        </div>
    </div>
  );
};

export default Login;