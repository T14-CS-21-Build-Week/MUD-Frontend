import React from 'react';
import './App.scss';

import { Route, Redirect } from "react-router-dom";

import Register from "./views/Register"
import Login from "./views/Login"
import Game from "./views/Game"

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Route
          exact
          path="/"
          render={(routeProps) =>
            localStorage.getItem("key")
              ? <Game />
              : <Login />
          }
        />
        <Route
          exact
          path="/register"
          render={(routeProps) =>
            localStorage.getItem("key")
              ? <Game />
              : <Register />
          }
        />
      </div>
    );
  }
}

export default App;
