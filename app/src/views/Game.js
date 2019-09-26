import React, { useState } from "react";
import axios from "axios";

import Map from "../components/Map"
import TitleBar from "../components/TitleBar"
import Chat from '../components/Chat'
import RoomInfo from '../components/RoomInfo'
import Controls from '../components/Controls'
import BottomPanel from '../components/BottomPanel'

import './Game.scss'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: {},
      nodes: [],
      links: []
    }
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

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/adv/rooms/`)
    .then(res => {
      this.setState({
        ...this.state,
        rooms: res.data
      })
    })
    .then(res => {
      console.log(this.state.rooms)
      this.generateNodes()
    })
    .catch(err => {
      console.log(err)
    })
  }

  generateNodes = () => {
    const rooms = this.state.rooms;
    const nodes = []
    const links = []
    let link = {}

    for (let i = 0; i < rooms.length; i++) {
      let current_room = rooms[i]
      let current_room_coordinates = {x: current_room.x, y: current_room.y}
      nodes.push(current_room_coordinates)

      if (!(current_room.n_to === 0)) {
        link = {
          x1: current_room.x,
          y1: current_room.y,
          x2: current_room.x, 
          y2: current_room.y + 1
        }
        links.push(link)
      }

      if (!(current_room.e_to === 0)) {
        link = {
          x1: current_room.x,
          y1: current_room.y,
          x2: current_room.x + 1, 
          y2: current_room.y
        }
        links.push(link)
      }

      if (!(current_room.w_to === 0)) {
        link = {
          x1: current_room.x,
          y1: current_room.y,
          x2: current_room.x - 1, 
          y2: current_room.y
        }
        links.push(link)
      }

      if (!(current_room.s_to === 0)) {
        link = {
          x1: current_room.x,
          y1: current_room.y,
          x2: current_room.x, 
          y2: current_room.y - 1
        }
        links.push(link)
      }
    }

    this.setState({
      ...this.state,
      nodes: nodes,
      links: links
    })
  }

  render() {
    console.log("nodes", this.state.nodes)
    console.log("links", this.state.links)
    
    return (
      <div className="page-container">
      <TitleBar />
      <div className="content-container">
          <div className="game-container">
          <Map width={600} height={600} nodes={this.state.nodes} links={this.state.links}/>
          </div>
          <div className="information-container">
            <RoomInfo />
            <Controls />
            <Chat />
          </div>
        </div>
      <div className="bottom-container">
          <BottomPanel />
      </div>
      </div>
    );
  }
};

export default Game;