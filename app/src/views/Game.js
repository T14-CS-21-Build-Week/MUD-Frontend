import React, { useState } from "react";
import axios from "axios";
import Pusher from "pusher-js"

import Map from "../components/Map"
import TitleBar from "../components/TitleBar"
import Chat from '../components/Chat'
import RoomInfo from '../components/RoomInfo'
import Controls from '../components/Controls'
import BottomPanel from '../components/BottomPanel'
import PlayerNode from '../components/PlayerNode'

import './Game.scss'

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: {},
      nodes: [],
      links: [],
      current_room: {
        title: '',
        description: '',
        players: [],
        x: 0,
        y: 0
      },
      error: '',
      maxX: 0,
      maxY: 0,
      minX: 0,
      minY: 0,
      chats: [],
      playerUUID: null,
      mapHeight: 0
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

      this.setState({
        current_room: {
        title: res.data.title,
        description: res.data.description,
        x: res.data.x,
        y: res.data.y,
        players: res.data.players
      },
        playerUUID: res.data.uuid
      })

      Pusher.logToConsole = true;
      let pusher = new Pusher('e305935f79c646861ed1', {
        cluster: 'us3',
        forceTLS: true
      })
  
      const channel = pusher.subscribe(`p-channel-${res.data.uuid}`)
        channel.bind('broadcast', data => {
          this.setState({ chats: [...this.state.chats, data]})
      })
        channel.bind('chatter', data => {
          this.setState({ chats: [...this.state.chats, data]})
        })

    })

    .catch(err => {
      console.log(err)
    })

    axios.get(`${process.env.REACT_APP_BACKEND_URL}/api/adv/rooms/`)
    .then(res => {
      this.setState({
        ...this.state,
        rooms: res.data
      })
    })
    .then(res => {
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
    let maxX = 0
    let maxY = 0
    let minX = 1000000
    let minY = 1000000

    for (let i = 0; i < rooms.length; i++) {
      let current_room = rooms[i]
      let current_room_coordinates = {x: current_room.x, y: current_room.y}
      nodes.push(current_room_coordinates)

      if (current_room.x > maxX) {
        maxX = current_room.x
      }

      if (current_room.y > maxY) {
        maxY = current_room.y
      }

      if (current_room.x < minX) {
        minX = current_room.x
      }

      if (current_room.y < minY) {
        minY = current_room.y
      }

      if (!(current_room.n_to === -1)) {
        link = {
          x1: current_room.x,
          y1: current_room.y,
          x2: current_room.x, 
          y2: current_room.y + 1
        }
        links.push(link)
      }

      if (!(current_room.e_to === -1)) {
        link = {
          x1: current_room.x,
          y1: current_room.y,
          x2: current_room.x + 1, 
          y2: current_room.y
        }
        links.push(link)
      }

      if (!(current_room.w_to === -1)) {
        link = {
          x1: current_room.x,
          y1: current_room.y,
          x2: current_room.x - 1, 
          y2: current_room.y
        }
        links.push(link)
      }

      if (!(current_room.s_to === -1)) {
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
      links: links,
      maxX: maxX,
      maxY: maxY,
      minX: minX,
      minY: minY,
      mapHeight: this.refs.containerHeight.clientHeight
    })
  }

  movement = direction => {
    const key = localStorage.getItem("key")
    const auth = `Token ${key}`

    let data_to_send = {
      direction : direction
    }

    let config = {
      headers: {
        Authorization: auth 
      }
    } 

    axios.post(
      `${process.env.REACT_APP_BACKEND_URL}/api/adv/move/`, data_to_send, config)
    .then(res => {
      // console.log('Successful Movement')
      // console.log(res)

      if (res.data.error_msg === '') {
        console.log(this.state.chats)
        this.setState({
          current_room: {
            title: res.data.title,
            description: res.data.description,
            x: res.data.x,
            y: res.data.y,
            players: res.data.players
          },
          error: ''
        })
      } else {
        // console.log('Setting error data.')
        this.setState({
          error: res.data.error_msg
        })
      }
      
      })
    .catch(err => {
      console.log(err)
    })
  }

  pusherSetup = () => {
  }


  render() {
    return (
      <div className="page-container">
        <TitleBar />
        <div className="content-container">
          <div className="game-container" ref="containerHeight">
              <Map 
              width={700} 
              height={700} 
              nodes={this.state.nodes} 
              links={this.state.links}
              minX={this.state.minX}
              maxX={this.state.maxX}
              minY={this.state.minY}
              maxY={this.state.maxY}
            />
              <PlayerNode
              width={700} 
              height={700} 
              node={this.state.current_room} 
              minX={this.state.minX} 
              maxX={this.state.maxX}
              minY={this.state.minY}
              maxY={this.state.maxY}
              bottom={this.state.mapHeight}
            />
          </div>
          <div className="information-container">
            <RoomInfo current={this.state.current_room}/>
            <Controls movementHandler={this.movement} error={this.state.error}/>
            <Chat chats={this.state.chats}/>
          </div>
        </div>
        <BottomPanel />
      </div>
    );
  }
};

export default Game;