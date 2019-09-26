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
        props.movementHandler('s')
    }
    
    const southClickHandler = input => {
        props.movementHandler('n')
    }

    const eastClickHandler = input => {
        props.movementHandler('e')
    }

    const westClickHandler = input => {
        props.movementHandler('w')
    }
    return(
        <div className="controls-container">
            <h3 className="info-label"> Movement Controls </h3>
            <div className="controls">
                <FontAwesomeIcon className="icon" icon={faCaretSquareLeft} onClick={westClickHandler} size="3x" color="white"/>
                <FontAwesomeIcon className="icon" icon={faCaretSquareDown} onClick={southClickHandler} size="3x" color="white" />
                <FontAwesomeIcon className="icon" icon={faCaretSquareRight} onClick={eastClickHandler} size="3x" color="white" />
                <FontAwesomeIcon className="icon" icon={faCaretSquareUp} onClick={northClickHandler} size="3x" color="white" />    
            </div>
            <h4 className="error-label">{props.error}</h4>
        </div>
    )
}

export default Controls