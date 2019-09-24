import React, { useState } from "react";
import axios from "axios";

const Register = () => {

  const [username, setUsername] = useState("Joe Black");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const register = e => {
    e.preventDefault();

    const credentials = {
        "username": username,
        "password1": password,
        "password2": passwordConf
    }

    axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/registration/`, credentials)
    .then(res => {
        localStorage.setItem("key", res.data.key)
      });
  }

  return (
    <div className="login-container">
      <form onSubmit={e => register(e)}>
        <label htmlFor="login">
          Log in
          <input
            id="username"
            value={username}
            placeholder={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            id="password"
            type="password"
            value={password}
            placeholder={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            id="passwordConf"
            type="password"
            value={passwordConf}
            placeholder={passwordConf}
            onChange={e => setPasswordConf(e.target.value)}
          />
        </label>
        <button onClick={e => register(e)}>Submit</button>
      </form>
    </div>
  );
};

export default Register;