import './memberProfile.css';
import React, { Component } from 'react';
import axios from 'axios';
import NavPanel from '../Header/NavPanel';
import DashHeader from '../Header/DashHeader';
import ProfileFooter from '../Profile/ProfileFooter';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Paper from 'material-ui/Paper';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';


class MemberProfile extends Component {
    constructor() {
        super();
    
        this.state = {
            user_info: [],
            member_profile: []
        } 
    };

    componentDidMount(){
        axios.get('/api/member_profile/' + this.props.match.params.id).then( res => {
            this.setState({
                user_info: res.data
            })
        });
        axios.get('/api/member_profile_info/' + this.props.match.params.id).then( res => {
            this.setState({
                member_profile: res.data
            })
        });
    }

    render(){
        let render_member_name = this.state.user_info.display_name
        let render_member_img = this.state.user_info.img
        let render_member_email = this.state.member_profile.email
        let render_member_phone = this.state.member_profile.phone
        let render_member_about_me = this.state.member_profile.about_me 
        let render_member_boat = this.state.member_profile.boat_info
        let render_member_location = `${this.state.member_profile.city}, ${this.state.member_profile.us_state}`
        let render_member_status = this.state.member_profile.user_status
        let render_club_position = this.state.member_profile.club_position

        const styles = {
            card: {
              height: '500px',
              width: '500px',            
            },
          };
          const mediaTitleStyles = {
            title:{
              fontSize: 32,
              padding: 5,
              fontFamily: '""'
            },
            subtitle:{
              fontSize: 24,
              paddingLeft: 8,
              fontFamily: '""',
            }, 
            bottomtitle: {
                fontSize: 30,
                paddingLeft: 0,
                fontFamily: '""',
            },
          };

        return (
        
            <div>
                <DashHeader/>
                <NavPanel/>

                <div className='member-profile'>

                    <div>
                            <Card style={styles.card}>
                                <CardHeader  titleStyle = {mediaTitleStyles.title}
                                    subtitleStyle={mediaTitleStyles.subtitle}  title={render_member_name} subtitle={render_club_position}
                                />
                                <CardMedia overlay={<CardTitle title={render_member_location} titleStyle = {mediaTitleStyles.bottomtitle}/>}>
                                    <img src={render_member_img} width='500px' height= '500px' alt="profile pic" />
                                </CardMedia>
                            </Card>
                    </div>

                    <div className='member-info'>
                        
                        <div className='member-info-header'>{render_member_status}</div>

                        <div className='member-info-body'>
                            <div className='member-info-section'>
                                <div className='contact'>About</div>
                                <div className='contact-child'>{render_member_about_me}</div>
                            </div>
                            
                            <div className='member-info-section'>
                                <div className='contact'>Boat</div>
                                <div className='contact-child'>{render_member_boat}</div>
                            </div>

                            <div className='member-info-section'>
                                <div className='contact'>Contact</div>
                                <div className='contact-child'>{render_member_email}</div>
                                <div className='contact-child'>{render_member_phone}</div>
                            </div>
                            <div className='member-info-section'>
                                <div className='contact'>Club Position</div>
                                <div className='contact-child'>{render_club_position}</div>
                            </div>

                        </div>

                        <div className='member-info-footer'></div>

                    </div>     

                </div>    
                <ProfileFooter/>        
            </div>       
        )
    };
};

export default MemberProfile