import React from 'react';
import './Sidebar.css';
import {Avatar, IconButton } from '@material-ui/core';
import ChatIcon from '@material-ui/icons/Chat';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import SidebarChat from './SidebarChat';

function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebar__header">
                <Avatar
                src="https://cdn.fastly.picmonkey.com/contentful/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=800&q=70"
                />

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
                 </div>
            </div>

            <div className="sidebar__search">
                 <div class="sidebar__searchContainer">
                   <SearchIcon/>
                   <input type="text" name="" id=""/>
                 </div>
            </div>

            <div className="sidebar__chats">
                  <SidebarChat/>
                  <SidebarChat/>
                  <SidebarChat/>
            </div>
        </div>
    )
}

export default Sidebar;
