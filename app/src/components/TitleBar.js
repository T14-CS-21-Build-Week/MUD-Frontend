import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import './TitleBar.scss'

const TitleBar = props => {


    function logout() {
        localStorage.clear()
        window.location = '/'
    }

return(
    <div className="title-bar-container">
        <h1 className="title-name">WELCOME TO THE CONCRETE JUNGLE!</h1>
        <nav className="nav-links">
            <Link to="/about" className="about-link">About</Link>
            <a className="logout-link" onClick={logout}>Logout</a>
        </nav>
    </div>
    )
}


export default TitleBar