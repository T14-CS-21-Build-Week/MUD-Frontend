import React, { useState, useEffect } from "react";

import './InformationStyles.scss'

const RoomInfo = props => {
    // Need to map through players in order to get them to display properly.
    return(
        <div className="room-info-container">
            <h3 className="info-label"> Current Location</h3>
            <div className="room-info">
                <h1 className="room-title">{props.current.title} </h1>
                <p className="room-description"> {props.current.description} </p>
                <p className="room-players">{props.current.players.length === 0 ? 'No other players are in this room.' : props.current.players}</p>
            </div>
        </div>
    )
}


export default RoomInfo