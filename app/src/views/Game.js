import React, { useState } from "react";
import axios from "axios";

import Map from "../components/Map"

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
  }

  componentDidMount() {
    const key = localStorage.getItem("key")
    const auth = `Token ${key}`

    axios.get(
      `${process.env.REACT_APP_BACKEND_URL}/api/adv/init/`, 
      {
        headers: { Authorization: auth },
      })
    .then(res => {
        console.log(res)
      })
    .catch(err => {
      console.log("err", err)
    })
  }

  render() {
    return (
      <div className="game-container">
        <Map />
      </div>
    );
  }
};

export default Game;