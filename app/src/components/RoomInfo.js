import React, { useState, useEffect } from "react";

import './RoomInfo.scss'

const RoomInfo = props => {

    return(
        <div className="room-info-container">
            <h1 className="room-title"> {props.current.title} </h1>
            <p className="room-description"> {props.current.description} </p>
        </div>
    )
}


export default RoomInfo