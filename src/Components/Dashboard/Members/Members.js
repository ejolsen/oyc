import React, { Component } from 'react';
import axios from 'axios';
import NavPanel from '../Header/NavPanel';
import DashHeader from '../Header/DashHeader';
import MemberCard from './MemberCard';
import ProfileFooter from '../Profile/ProfileFooter';
import './members.css';

class Members extends Component {
  constructor() {
    super();

    this.state = {

      filteredUsers: '',
      users: []

    };
  };

  componentDidMount() {
    axios.get( '/api/member_list' )
    .then( res => {
      this.setState({
        users: res.data
      })
    })
  };

  handleChange(userSearch){
    this.setState({
      filteredUsers: userSearch
    })
  };
  
  render() {

    let filteredUsers = this.state.users.filter( (user, i) => {
      let cased = user.display_name.toUpperCase()
      return cased.includes(this.state.filteredUsers.toUpperCase())
    }).map( (user, i) => { 
        return (
          <div key={i}>
            <MemberCard  user={user} />
          </div>
        )
      });       

    return (
      <div>
        <DashHeader/>
          <NavPanel/>
        <div className='members-page'>

          

          <div className='member-input-title'>
            <div className='member-title'>Club Members</div>
            <input className='member-input' placeholder='Search Members' onChange={ (e) => this.handleChange(e.target.value) } type="text"/>
          </div>
              
          <div className='member-list' >{filteredUsers}</div>

          
        
        </div>
        <ProfileFooter/>
         
      </div>
    );
  };

};
  
export default Members