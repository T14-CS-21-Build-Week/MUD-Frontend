import React, { useState, useEffect } from "react";

import './InformationStyles.scss'

const RoomInfo = props => {

    return(
        <div className="room-info-container">
            <h3 className="info-label"> Current Location</h3>
            <div className="room-info">
                <h1 className="room-title">{props.current.title} </h1>
                <p className="room-description"> {props.current.description} </p>
            </div>
        </div>
    )
}


export default RoomInfo