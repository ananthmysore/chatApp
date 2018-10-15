import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

import group  from '../images/group.png';

export default class roomList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          rooms: []
        };
      }
    
      componentDidMount() {
        axios.get('http://localhost:8080/api/room')
          .then(res => {
            this.setState({ rooms: res.data });
          });
      }
  render() {
    return (
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
    )
  }
}

