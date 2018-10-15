import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as io from 'socket.io-client'
import '../index.css';

const socketUrl = "http://localhost:4000";
export default class joinRoom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            socket:null,
            nickname:'',
            room_id:'',
            room_name:''
        };
      }
      componentWillMount(){
        this.initSocket();
      }
    
      initSocket = ()=>{
        const socket = io(socketUrl)
        socket.on('connect', ()=>{
          console.log('connected');
        });
        this.setState({socket}); 
      }
      onChange(evt){
        const state = this.state
        state[evt.target.name] = evt.target.value;
        this.setState(state);
        console.log(this.props)
      }
      onclickHandle(e){
          e.preventDefault();
        console.log(this.state.nickname)
        let details = {
            room:{
                "_id": this.props.match.params.id,
                "room_name": this.props.match.params.room_name,
              },
            nickname:this.state.nickname
        }
          axios.post(`http://localhost:8080/api/chat/`,details)
          .then(response => {
            this.props.history.push('/chat-room/'+this.props.match.params.id+'/'+this.state.nickname+'')
            this.socket.emit('save-message', { room: 'Javascript', nickname: this.state.nickname, message: 'Join this room' });
          })
          .catch(e => {
            console.log('errors')
          })
        }

  render() {
    return (
        <div className="chat">
            <div className="chat-header clearfix">
            <div className="chat-about">
                <div className="chat-with">Join this room</div>
            </div>
            <i className="fa fa-star"></i>
            </div> 
            
            <div className="chat-history">
            <div className="chat-message clearfix">
            <input  name="nickname" id="message-to-send" value={this.state.nickname} onChange={(evt) => this.onChange(evt)} placeholder ="Type your Nickname" />
            <button onClick={(e)=> this.onclickHandle(e)} className="submit">Submit</button>
            </div>
            </div>
      </div> 
    )
  }
  static contextTypes = {
    router: PropTypes.object
  }
}
