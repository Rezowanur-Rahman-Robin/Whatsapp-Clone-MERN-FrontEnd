import react,{useEffect,useState} from 'react';
import {BrowserRouter as Router ,Switch,Route} from 'react-router-dom';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';
import Login from './Login';
import { useStateValue } from './StateProvider';

function App() {

  const [messages,setMessages]=useState([]);
  const [rooms,setRooms]=useState([]);


  const [{user},dispatch]=useStateValue();



 

  useEffect(()=>{
     axios
     .get('/messages/sync')
     .then(response=>{
       console.log(response.data);
       
       setMessages(response.data);
     })
  },[]);

  useEffect(()=>{
    axios
    .get('/rooms/sync')
    .then(response=>{
      console.log(response.data);
      setRooms(response.data);
    })
  },[])

  useEffect(()=>{
    var pusher = new Pusher('f61656c8592b902adfa7', {
      cluster: 'eu'
    });

    var channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) =>{
      //alert(JSON.stringify(newMessage));
      setMessages([...messages,newMessage]); //... means keep all messages and newMessage is  added with the old messages.
    });

   

   

    return () =>{
      channel.unbind_all();//when the messages changes then channel will again try to subscribe and bind for the double time.for avaoiding this.at the end of the useEffect we have to return a function which unssubscribe the channel.
      channel.unsubscribe();
    }

  },[messages]);

  useEffect(()=>{

    var pusher = new Pusher('f61656c8592b902adfa7', {
      cluster: 'eu'
    });

    var channelRoom = pusher.subscribe('rooms');
    channelRoom.bind('inserted',(newRoom)=>{
      setRooms([...rooms,newRoom]);
    });

    return () =>{
      channelRoom.unbind_all();//when the messages changes then channel will again try to subscribe and bind for the double time.for avaoiding this.at the end of the useEffect we have to return a function which unssubscribe the channel.
      channelRoom.unsubscribe();
    }

  },[rooms])

  console.log(messages);
  return (
    <div className="app">
      {!user ? (
        <Login/>
      ):
      (
        <div className="app__body">


        <Router>
          <Switch>
              <Route path="/rooms/:roomId">
                 {/* Sidebar */}
                   <Sidebar rooms={rooms} />
                 {/* Chat */}
                   <Chat messages={messages} rooms={rooms}/>
              </Route>

              <Route path="/">
                  <Sidebar rooms={rooms}/>
                  <h1>Home Screen</h1>
              </Route>
          </Switch>

        </Router>

      
      
      </div>
      )
      }



     
   
    </div>
  );
}

export default App;
