import React, { useState } from "react";
import axios from "axios";

const Login = () => {

  const [username, setUsername] = useState("Joe Black");
  const [password, setPassword] = useState("");
  const [passwordConf, setPasswordConf] = useState("");

  const register = e => {
    e.preventDefault();


  }

  return (
    <div className="login-container">
      <form>
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
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Login;