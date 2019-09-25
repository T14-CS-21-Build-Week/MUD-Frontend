import React, { useState } from "react";
import axios from "axios";

import Map from "../components/Map"
import TitleBar from "../components/TitleBar"
import Chat from '../components/Chat'
import RoomInfo from '../components/RoomInfo'
import Controls from '../components/Controls'

import './Game.scss'


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
      <div className="page-container">
      <TitleBar />
      <div className="content-container">
          <div className="game-container">
            <Map />
          </div>
          <div className="information-container">
            <RoomInfo />
            <Controls />
            <Chat />
          </div>
        </div>
      <div className="bottom-container">
          <BottomInfo />
      </div>
      </div>
    );
  }
};

export default Game;