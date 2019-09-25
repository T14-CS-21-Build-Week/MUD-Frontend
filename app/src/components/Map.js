import React, { useState } from "react";
import axios from "axios";

import "./Map.scss"

class Map extends React.Component {
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

    let elements = []
    for (let i = 0; i < 400; i++) {
        elements.push(1)
    }

    return (
      <div className="map-container">
            <div 
                className="room abc"
                style={{gridColumn: 5, gridRow: 5}}   
            >    
            </div>
            <div 
                className="room abc"
                style={{gridColumn: 5, gridRow: 6}}   
            >    
            </div>
            <div 
                className="room abc"
                style={{gridColumn: 20, gridRow: 20}}   
            >    
            </div>
          {/*elements.map(element => {
              return <div className="room"></div>
          })*/}
      </div>
    );
  }
};

export default Map;