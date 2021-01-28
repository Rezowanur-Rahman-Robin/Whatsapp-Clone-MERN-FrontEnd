import React,{useState} from 'react';
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';

function Chat({messages}) {

    const [input,setInput] = useState("");

    const sendMessage=async (e)=>{
           e.preventDefault();

           await axios.post("/messages/new",{
               message:input,
               name:"Rezowanur Rahman Robin",
               timestamp:"Just now!",
               received:false,
           });

           setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
                 <Avatar/>

                 <div className="chat__headerInfo">
                     <h3>Room Name</h3>
                     <p>Last seen at...</p>

                 </div>

                 <div className="chat__headerRight">
                      <IconButton>
                      <SearchIcon/>
                      </IconButton>

                      <IconButton>
                      <AttachFileIcon/>
                      </IconButton>

                      <IconButton>                  
                      <MoreVertIcon/>
                      </IconButton>
                     
                 </div>
            </div>

            <div className="chat__body">
                {messages.map((message)=>(

            <p className={`chat__message ${message.received && "chat__receiver"}`}>
              <span className="chat__name">
                         {message.name}
              </span>
                     {message.message}

               <span className="chat__timestamp">
                   {message.timestamp}
              </span>

            </p>

                ))}
               



                
            </div>

            <div className="chat__footer">
            <EmojiEmotionsIcon/>
            <form>
                <input 
                type="text"
                value={input}
                placeholder="Type a message.."
                onChange={(e)=>setInput(e.target.value)}
                />
                <button onClick={sendMessage} type="submit">
                    Send a message
                </button>
                <MicIcon />
            </form>
            </div>
        </div>
    )
}

export default Chat;
