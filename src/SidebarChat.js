import React,{useEffect,useState} from 'react';
import './SidebarChat.css';
import {Avatar} from "@material-ui/core";
import axios from './axios';
import {Link} from 'react-router-dom';

function SidebarChat({addNewChat,roomName,id}) {

    const [seed,setSeed]= useState('');
    const [allMessage,setAllMessages]=useState([]);
    const [lastMsg,setLastMessage]=useState(null);
    



    useEffect(()=>{
          setSeed(Math.floor(Math.random()*5000));
    },[]);

    useEffect(()=>{
        axios
        .get('/messages/sync')
        .then(response=>{
          console.log(response.data);
          
          setAllMessages(response.data);

          const roomMessages= allMessage.filter(message => message.roomId===id);

          if(roomMessages.length>0){
            const lastMessage=roomMessages[roomMessages.length-1];
            setLastMessage(lastMessage);
          }

         
        })
     },[allMessage]);

     //console.log(lastMsg);

    const createChat = async ()=>{
      const roomName= prompt('Please Enter the Room Name:');
      if(roomName){
            await axios.post("/rooms/new",{
                name:roomName,
                timestamp:new Date().toUTCString()
            });
      }
    }



     

    
    

   

    return !addNewChat ?  (
        <Link to={`/rooms/${id}`}>
         <div className="sidebarChat">

              <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`}/>
                 <div className="sidebarChat__info">
                  <h2>{roomName}</h2>
                  <p><strong>{lastMsg && lastMsg.name}:</strong>{lastMsg && lastMsg.message.slice(0,25)}...</p>
                 </div>

                 </div>
        </Link>
       
    ):(
        <div onClick={createChat} className="sidebarChat">
              <h2>Add new Chat</h2>
        </div>
    )
}

export default SidebarChat;
