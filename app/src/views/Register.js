import React, { useState } from "react";
import axios from "axios";

import './Register.scss';

const Register = (props) => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const sendCredentials = e => {
    e.preventDefault();

    const credentials = {
        "username": username,
        "password1": password,
        "password2": passwordConf
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/registration/`, credentials)
    .then(res => {
        localStorage.setItem("key", res.data.key);
        props.history.push("/game")
      });
  }

  return (
    <div className="register-container">
      <h2>Register</h2>
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
          <input
            id="passwordConf"
            type="password"
            value={passwordConf}
            placeholder="Confirm password"
            onChange={e => setPasswordConf(e.target.value)}
          />
        <button onClick={e => sendCredentials(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Register;