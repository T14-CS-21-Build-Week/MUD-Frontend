import React, { useState } from "react";
import axios from "axios";

import Map from "../components/Map2"

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      rooms: [],
      nodes: [],
      links: []
    }
  }

  componentDidMount() {
    const key = localStorage.getItem("key")
    const auth = `Token ${key}`
    const rooms0 = [
      {x: 1, y: 2, w_to: 0, e_to: 1, s_to: 0, n_to: 0},
      {x: 2, y: 2, w_to: 0, s_to: 0, n_to: 0, e_to: 0},
      {x: 2, y: 1, n_to: 1, w_to: 0, s_to: 0, e_to: 0}
    ]

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

    /*axios.get("https://team14bw.herokuapp.com/api/adv/rooms/")
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
  */

  this.generateNodes(rooms0)

}

  generateNodes = (rooms0) => {
    let rooms = [...rooms0];
    const nodes = []
    const links = []
    let link = {}
    let room_stack = []
    let stack1 = []
    const already_added_rooms = {}
    console.log("rooms", rooms)
    console.log("first room", rooms[0])
    // Add first room to the stack
    const firstroom = {...rooms[0]}
    stack1.push(firstroom)
    // Mark it as already drawn
    already_added_rooms["0"] = true;

    console.log("STACK", stack1)

    let count = 0

    while (count <= 10) {
      console.log("stack before pop", stack1)
      let current_room = stack1.pop();
      console.log("stack after pop", stack1)
      let current_room_coordinates = {x: current_room.x, y: current_room.y}
      nodes.push(current_room_coordinates)
      console.log("current room", current_room)
      console.log(already_added_rooms)

      if (current_room.e_to) {
        if (!already_added_rooms[`${current_room.e_to}`])
          console.log("Entered East")
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
          already_added_rooms[`${current_room.e_to}`] = true
      } 
      
      if (current_room.w_to) {
        if (!already_added_rooms[`${current_room.w_to}`])
          // Create the link between connected rooms
          console.log("Entered West")
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
          already_added_rooms[`${current_room.w_to}`] = true
      }

      if (current_room.n_to) {
        if (!already_added_rooms[`${current_room.n_to}`])
          // Create the link between connected rooms
          console.log("Entered North")
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
          already_added_rooms[`${current_room.n_to}`] = true
      }

      if (current_room.s_to) {
        if (!already_added_rooms[`${current_room.s_to}`])
          // Create the link between connected rooms
          console.log("Entered South")

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
          already_added_rooms[`${current_room.s_to}`] = true
      }

      count += 1
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
        {<Map width={600} height={600} nodes={this.state.nodes} links={this.state.links}/>}
      </div>
    );
  }
};

export default Game;