import React, { useState, useEffect } from "react";

import './InformationStyles.scss'

const Chat = props => {
    console.log(props)
    return(
        <div className="chat-container">
            <h3 className="info-label">Chat</h3>
            <ul className="chat-message-list">
                {props.chats.map(chat => {
                    return(
                       <li className="chat-message">{chat}</li> 
                    )
                })}
            </ul>
        </div>
    )
}

export default Chat