import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import group  from '../images/group.png';

export default class sideBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            rooms: [],
            room_name:''
        }
    }
    onChange(e){
        e.preventDefault();
        const state = this.state
        state[e.target.name] = e.target.value
        this.setState(state)
    }
    onAdd(){
        console.log(this.state.room_name)
        let name = {
            room_name: this.state.room_name
        }
        axios.post(`http://localhost:8080/api/room`, name)
        .then(response => {
            this.getChatRooms()
        })
        .catch(e => {
            console.log('errors')
        })
    
        const state = this.state
        state['room_name'] = ''
        this.setState(state)
    }
    componentDidMount() {
        this.getChatRooms();  
      }
      getChatRooms(){
        axios.get('http://localhost:8080/api/room')
        .then(res => {
          this.setState({ rooms: res.data });
        });
      }
  render() {
    return (
        <div>
            <div className="people-list">
                <div className="row">
                    <div className="col-sm-12 search input-group">
                        <input 
                            type="text"
                            placeholder="Add Room" 
                            name="room_name" 
                            className="form-control"
                            value={this.state.room_name}
                            onChange={(e) => this.onChange(e)}/>
                        <span class="input-group-btn">
                            <button 
                                type="button"
                                className="btn btn-add"
                                onClick={() => this.onAdd()}>
                                <i className="fa fa-plus"></i>
                            </button>
                        </span>
                    </div>
                </div>
                <ul className="list">
                    {this.state.rooms.map(room =>
                        <Link to={`/join-room/${room._id}`}>
                            <li className="clearfix">
                            <img src={group} alt="avatar" />
                            <div className="about">
                            <div className="name">{room.room_name}</div>
                            <div className="status">
                                <i className="fa fa-circle online"></i> active
                            </div>
                            </div>
                        </li>
                        </Link> 
                    )}
                </ul>
            </div>
        </div>
    )
  }
}
