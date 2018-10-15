import React, { Component } from 'react';
import axios from 'axios';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './index.css';


import SideBar from './components/sideBar';
import Main from './components/Main';
import RoomList from './components/roomList';
import AddRoom from './components/addRoom';
import JoinRoom from './components/joinRoom';
import ChatRoom from './components/chatRoom';




class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      join:true,
    };
  }

  

  render() {
    return (
      <div className="container clearfix">
        <div className="child">
        <SideBar />
        <Main />
        </div>
      </div> 
    );
  }
}

export default App;