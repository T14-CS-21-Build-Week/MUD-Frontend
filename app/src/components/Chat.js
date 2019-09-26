import React, { useState, useEffect } from "react";

import './InformationStyles.scss'

const Chat = props => {
    console.log(props)
    return(
        <div className="chat-container">
            <h3 className="info-label">Chat</h3>
            <ul className="chat-message-list">
                {props.chats.map(chat => {
                    if (chat.type === true) {
                        console.log('NO #1')
                        return (
                            <li className="chat-message"> 
                                <p className="chat-username">{chat.chatuser}:</p>
                                <p className="chat-text">{chat.chatmessage}</p>
                            </li>
                        )
                    } else {
                        console.log('NO #2')
                        return (
                            <li className="event-message">
                               <p className="event-text">{chat.message}</p> 
                            </li>
                        )
                    }
                })}
            </ul>
        </div>
    )
}

export default Chat