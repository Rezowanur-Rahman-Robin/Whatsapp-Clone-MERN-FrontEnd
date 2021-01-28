import react,{useEffect,useState} from 'react';
import './App.css';
import Chat from './Chat';
import Sidebar from './Sidebar';
import Pusher from 'pusher-js';
import axios from './axios';

function App() {

  const [messages,setMessages]=useState([])

  useEffect(()=>{
     axios
     .get('/messages/sync')
     .then(response=>{
       console.log(response.data);
       setMessages(response.data);
     })
  },[]);

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

  console.log(messages);
  return (
    <div className="app">

      <div className="app__body">

       {/* Sidebar */}
       <Sidebar/>
      {/* Chat */}
      <Chat messages={messages}/>
      
      </div>

     
   
    </div>
  );
}

export default App;
