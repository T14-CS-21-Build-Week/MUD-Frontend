import React from 'react';
import './App.scss';

import Register from "./views/Register"

class App extends React.Component {
  constructor() {
    super()
    this.state = {}
  }

  render() {
    return (
      <div className="App">
        <Register />
      </div>
    );
  }
}

export default App;
