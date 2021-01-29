import React from 'react';
import './Sidebar.css';
import {Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PowerSettingsNewIcon from '@material-ui/icons/PowerSettingsNew';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';
import { useStateValue } from './StateProvider';
import { auth } from './fbase';
import { actionTypes } from './reducer';

function Sidebar({rooms}) {
    const [{user},dispatch]=useStateValue();
     console.log(user);

     const handleSignOut = ()=>{
         auth.signOut();
        dispatch({
            type: actionTypes.SET_USER,
            user:null
        })
     }


    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <div className="header__info">
                <Avatar
                src={user?.photoURL}
                />
                <h4>{user?.displayName}</h4>
                </div>
                

                 <div className="sidebar__headerRight">

                     <IconButton>
                         <DonutLargeIcon/>
                     </IconButton>
                     <IconButton>
                         <ChatIcon/>
                     </IconButton>
                     <IconButton>
                         <MoreVertIcon/>
                     </IconButton>

                     <IconButton>
                     <PowerSettingsNewIcon onClick={handleSignOut}/>
                     </IconButton>
                 </div>
            </div>

            <div className="sidebar__search">
                 <div class="sidebar__searchContainer">
                   <SearchIcon/>
                   <input type="text" name="" id=""/>
                 </div>
            </div>

            <div className="sidebar__chats">
                  <SidebarChat addNewChat={true}/>
                 {rooms.map((room)=>(
                    
                      <SidebarChat id={room._id} roomName={ room.name}/>
                      
                    

                 ))}
                  
            </div>
        </div>
    )
}

export default Sidebar;
