import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import * as io from 'socket.io-client';
import scrollToComponent from 'react-scroll-to-component';

const socketUrl = "http://localhost:4000";
export default class chatRoom extends Component {
    constructor(props){
        super(props);
        this.state = {
            socket:null,
            nickname:'',
            chats: [],
            errors: [],
            message:'',
        }
    }
    componentWillMount() {
        this.initSocket();
        axios.get('http://localhost:8080/api/chat/'+this.props.match.params.id)
          .then(res => {
            if(res.data){
                this.setState({ chats: [...this.state.chats, ...res.data]});
            }
            console.log(this.state.chats)
          });
        this.setState({nickname:this.props.match.params.nickname}) 
        
      }
      componentDidMount() {
        scrollToComponent(this.bot, { offset: 0, align: 'middle', duration: 500, ease:'inCirc'});
      }
      initSocket = ()=>{
        const socket = io(socketUrl)
        socket.on('connect', ()=>{
          console.log('connected');
        });
        this.setState({socket}); 
      }
      _callSocket(){
        this.state.socket.on('new-message', function (state) {
            // if(data.message.room === this.$route.params.id) {
            //   this.state.chats.push(data.message)
            // }
            console.log('i am in socket')
          }.bind(this))
      }
      onChange(e){
          e.preventDefault();
          const state = this.state
          state[e.target.name] = e.target.value
          this.setState(state); 
      }
      onSend(evt){
          evt.preventDefault();
        //   console.log(this.state.message,this.props.match.params.id,this.props.match.params.nickname)
          let chat = {
              room:{
                "_id": this.props.match.params.id,
              },
              message:this.state.message,
              nickname:this.props.match.params.nickname,
          }
          axios.post(`http://localhost:8080/api/chat`, chat,)
            .then(response => {
                console.log(response)
                })
            .catch(e => {
                console.log('error')
            })
            const state = this.state;
            this._callSocket()
          this.setState({message:''})
          
          
      }
  render() {
    return (
        <div className="chat">
        <div className="chat-header clearfix">
          {/* <img src={group} alt="avatar" /> */}
          <div className="chat-about">
            <div className="chat-with">Chats Details</div>
          </div>
          <i className="fa fa-star"></i>
        </div> 
        
        <div className="chat-history" >
            {this.state.chats.map(chat =>
                <div key={chat._id}>
                <div className="message-data">
                    <span className="message-data-name">{chat.nickname}</span>
                    <span className="message-data-time">{(chat.created_date).substr(0, 10) }</span>
                </div>
            <ul>
            <li className="clearfix">
                {chat.nickname == (this.state.nickname).toString()?
                     <div className="message my-message">{chat.message? chat.message:'You joined the room'}</div>
                     :<div className="message other-message float-right">{chat.message? chat.message:chat.nickname+' joined the room'}</div>}
            </li>
            </ul>
        </div>
            )}
         </div>
    
        
        <div className="chat-message clearfix" ref={(section) => { this.bot = section; }}>
          <textarea onChange={(e)=> this.onChange(e)} name="message" id="message-to-send" value={this.state.message} placeholder ="Type your message" rows="3"></textarea>
          <button onClick={(evt) => this.onSend(evt)}className="submit">Send</button>
        </div>
      </div> 
    )
  }
  static contextTypes = {
    router: PropTypes.object
  }
}
