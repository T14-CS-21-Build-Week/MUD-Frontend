import React, { useState } from "react";
import axios from "axios";

import Map from "../components/Map2"

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

    axios.get("https://team14bw.herokuapp.com/api/adv/rooms/")
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
    const room_stack = []
    const already_added_rooms = {}

    // Add first room to the stack
    room_stack.push(rooms[0])
    // Mark it as already drawn
    already_added_rooms[0] = true;

    while (room_stack.length > 0) {
      let current_room = room_stack.pop();
      let current_room_coordinates = {x: current_room.x, y: current_room.y}
      nodes.push(current_room_coordinates)

      if (current_room.e_to) {
        if (!already_added_rooms[current_room.e_to])
          // Create the link between connected rooms
          link = {
            x1: current_room.x, 
            y1: current_room.y,
            x2: rooms[current_room.e_to].x,
            y2: rooms[current_room.e_to].y
          }
          links.push(link)
          
          // Add the connected room to the stack
          room_stack.push(rooms[current_room.e_to])

          //Mark the connected room as already added to the stack
          already_added_rooms[current_room.e_to] = true
      } 
      
      if (current_room.w_to) {
        if (!already_added_rooms[current_room.w_to])
          // Create the link between connected rooms
          link = {
            x1: current_room.x, 
            y1: current_room.y,
            x2: rooms[current_room.w_to].x,
            y2: rooms[current_room.w_to].y
          }
          links.push(link)
          
          // Add the connected room to the stack
          room_stack.push(rooms[current_room.w_to])

          //Mark the connected room as already added to the stack
          already_added_rooms[current_room.w_to] = true
      }

      if (current_room.n_to) {
        if (!already_added_rooms[current_room.n_to])
          // Create the link between connected rooms
          link = {
            x1: current_room.x, 
            y1: current_room.y,
            x2: rooms[current_room.n_to].x,
            y2: rooms[current_room.n_to].y
          }
          links.push(link)
          
          // Add the connected room to the stack
          room_stack.push(rooms[current_room.n_to])

          //Mark the connected room as already added to the stack
          already_added_rooms[current_room.n_to] = true
      }

      if (current_room.s_to) {
        if (!already_added_rooms[current_room.s_to])
          // Create the link between connected rooms
          link = {
            x1: current_room.x, 
            y1: current_room.y,
            x2: rooms[current_room.s_to].x,
            y2: rooms[current_room.s_to].y
          }
          links.push(link)
          
          // Add the connected room to the stack
          room_stack.push(rooms[current_room.s_to])

          //Mark the connected room as already added to the stack
          already_added_rooms[current_room.s_to] = true
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
      <div className="game-container">
        {/*<Map width={600} height={600} nodes={this.state.nodes} links={this.state.links}/>*/}
      </div>
    );
  }
};

export default Game;