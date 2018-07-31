import './memberProfile.css';
import React, { Component } from 'react';
import axios from 'axios';
import DashHeader from '../Header/DashHeader';

class MemberProfile extends Component {
    constructor() {
        super();
    
        this.state = {
            user_id: '',
            status: '',
            email: '',
            phone: '',
            city: '',
            us_state: '',
            boat_info: '',
            about_me: '',
            club_position: '',
            profile_img: '',
            boat_type: '',
            boat_length: '',
            boat_name: '',
            member_profile: '',
            display_name: ''
        } 
    };

    componentDidMount() {
        axios.get('/api/user_session').then(res =>
            res.data.passport 
            ?
            this.getMemberInfo()
            : 
            this.props.history.push("/")
        );
    };

    getMemberInfo() {
        axios.get('/api/member_profile_info/' + this.props.match.params.id).then( res => {
            this.setState({
                user_id: res.data.user_id,
                profile_img: res.data.profile_img,
                status: res.data.user_status,
                email: res.data.email,
                phone: res.data.phone,
                city: res.data.city,
                us_state: res.data.us_state,
                boat_info: res.data.boat_info,
                about_me: res.data.about_me,
                club_position: res.data.club_position,
                boat_type: res.data.boat_type,
                boat_length: res.data.boat_length,
                boat_name: res.data.boat_name,
            })
        });
        axios.get('/api/member_profile/' + this.props.match.params.id).then( res => {
            this.setState({
                display_name: res.data.display_name
            })
        });
    };

    render(){

        return (
            <div> 
            <div className='profile-page'>
              <DashHeader component_title={`${this.state.display_name}'s Profile`}/>
              <div className='profile-section'>                           
                <div className='profile-card-section'>
                  <div className='profile-card-left-section'>
                    <div className='profile-card-pic-section'>
                      <div className='profile-card-pic-title'>
                        {this.state.display_name}
                      </div>
                      <img className='profile-card-pic'src={this.state.profile_img} alt="profile pic" />
                      <div className='profile-card-pic-position'>{this.state.club_position}</div>
                    </div>
                    <div className='profile-card-contact'>
                        <div className='profile-card-contact-title'>Member Contact</div>
                        <div className='profile-card-contact-info'>Email: {this.state.email}</div>
                        <div className='profile-card-contact-info'>Phone: {this.state.phone}</div>
                        <div className='profile-card-contact-info'>Location: {`${this.state.city}, ${this.state.us_state}`}</div>
                    </div>
                  </div>
                  <div className='profile-card-info'>
                    <div className='status-bar'>
                      <div className='status-title'>{this.state.status}</div>
                    </div>
                    <div className='pro-info'>
                      <div className='pro-info-top'>
                        <div className='pro-info-title'>Boat Type</div>
                        <div className='pro-info-info'>{this.state.boat_type}</div>
                        <div className='pro-info-title'>Boat Length</div>
                        <div className='pro-info-info'>{this.state.boat_length}'</div>
                        <div className='pro-info-title'>Boat Name</div>
                        <div className='pro-info-info'>{this.state.boat_name}</div>
                      </div>
                      <div className='pro-info-bottom'>
                        <div className='pro-info-title'>About</div>
                        <div className='pro-info-info-about'>{this.state.about_me}</div>
                      </div>
                    </div>
                  </div>
                </div>   
              </div>
            </div>
        </div>
        )
    };
};

export default MemberProfile