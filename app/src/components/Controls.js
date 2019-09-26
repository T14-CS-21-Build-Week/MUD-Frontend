import React, { useState, useEffect } from "react";

// Font Awesome Icons for Arrow Keys

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faCaretSquareLeft,
        faCaretSquareRight, 
        faCaretSquareUp, 
        faCaretSquareDown } from '@fortawesome/free-solid-svg-icons'


import './InformationStyles.scss'

const Controls = props => {
    const northClickHandler = input => {
        console.log('North clicked')
        props.movementHandler('n')
    }
    
    const southClickHandler = input => {
        console.log('South clicked')
        props.movementHandler('s')
    }

    const eastClickHandler = input => {
        console.log("East clicked")
        props.movementHandler('e')
    }

    const westClickHandler = input => {
        console.log('West clicked')
        props.movementHandler('w')
    }
    console.log(props)
    return(
        <div className="controls-container">
            <h3 className="info-label"> Movement Controls </h3>
            <h4 className="error-label">{props.error}</h4>
            <FontAwesomeIcon icon={faCaretSquareLeft} onClick={westClickHandler} size="3x" color="white"/>
            <FontAwesomeIcon icon={faCaretSquareDown} onClick={southClickHandler} size="3x" color="white" />
            <FontAwesomeIcon icon={faCaretSquareRight} onClick={eastClickHandler} size="3x" color="white" />
            <FontAwesomeIcon icon={faCaretSquareUp} onClick={northClickHandler} size="3x" color="white" />
            
        </div>
    )
}

export default Controls