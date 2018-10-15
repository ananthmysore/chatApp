import React, { Component } from 'react';
import {  BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddRoom from './addRoom';
import JoinRoom from './joinRoom';
import ChatRoom from './chatRoom';

export default class Main extends Component {
  render() {
    return (
        <Switch>
            <Route path='/add-room' component={AddRoom} />
            <Route path='/join-room/:id' render={ props => <JoinRoom {...props} />} />
            <Route path='/chat-room/:id/:nickname' render={ props => <ChatRoom {...props} />} />
          </Switch>
    )
  }
}
