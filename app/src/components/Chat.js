import React, { useState, useEffect } from "react";
import axios from 'axios';

import './InformationStyles.scss'

const Chat = props => {
    const [chatinput, setChatInput] = useState('')


    console.log(props)
    let chats_to_use = props.chats.slice(-6)

    const sendChat = e => {
        e.preventDefault()
        console.log("Send Chat!")

        const key = localStorage.getItem("key")
        const auth = `Token ${key}`

        let data_to_send = {
            "chatmessage" : chatinput
          }
      
          let config = {
            headers: {
              Authorization: auth 
            }
          } 
      
        axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/adv/say/`,
        data_to_send,
        config)
        .then(res => {
            console.log(res)
        })
        .catch(err => {
            console.error(err)
        })

        setChatInput('')
    }

    return(
        <div className="chat-container">
            <h3 className="info-label">Chat</h3>
            <ul className="chat-message-list">
                {chats_to_use.map(chat => {
                    if (chat.type === true) {
                        return (
                            <li className="chat-message"> 
                                <p className="chat-username">{chat.chatuser}:</p>
                                <p className="chat-text">{chat.chatmessage}</p>
                            </li>
                        )
                    } else {
                        return (
                            <li className="event-message">
                               <p className="event-text">{chat.message}</p> 
                            </li>
                        )
                    }
                })}
            </ul>
            <form className="chatbox-container"onSubmit={sendChat} >
            <input className="chatbox" type="text" value={chatinput} onChange={e=> setChatInput(e.target.value)}/>
            </form>
        </div>
    )
}

export default Chat