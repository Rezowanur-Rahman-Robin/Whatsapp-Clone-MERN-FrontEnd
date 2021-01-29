import React,{useState,useEffect} from 'react';
import './Chat.css';
import {Avatar,IconButton} from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import MicIcon from '@material-ui/icons/Mic';
import axios from './axios';
import {useParams} from 'react-router-dom';
import { useStateValue } from './StateProvider';



function Chat({messages,rooms}) {

    const [input,setInput] = useState("");
    const [seed,setSeed]= useState('');
    const {roomId}=useParams();
    const [roomName,setRoomName]=useState('');
    const [{user}, dispatch]= useStateValue();
    

    const roomMessages= messages.filter(message => message.roomId===roomId);


    const lastMessage=roomMessages[roomMessages.length-1];
        
    
    

    useEffect(()=>{
        if(roomId){
            rooms.map((item)=>{
                 if(item._id === roomId){
                     setRoomName(item.name);
                 }
            });
           
        }

    },[roomId])

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000));
  },[]);

    const sendMessage=async (e)=>{
           e.preventDefault();

           await axios.post("/messages/new",{
               message:input,
               name: user?.displayName,
               timestamp: new Date().toUTCString(),
               received:true,
               roomId: roomId,
               uId:user.uid
           });

           setInput('');
    }

    return (
        <div className="chat">
            <div className="chat__header">
            <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>

                 <div className="chat__headerInfo">
                     <h3>{roomName} </h3>
                     <p>Last seen: {lastMessage.timestamp}</p>

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
                {roomMessages.map((message)=>(

            <p className={`chat__message ${message.uId ==user.uid && "chat__receiver"}`}>
              <span className="chat__name">
                         { message.name}
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
