import './profile.css';
import React, { Component } from 'react';
import axios from 'axios';
import DashHeader from '../Header/DashHeader';
import ProfileFooter from './ProfileFooter';
import {connect} from 'react-redux';
import {getUser, getUserInfo} from '../../../redux/reducer';
import {Card, CardHeader, CardMedia, CardTitle} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';

class Profile extends Component {
  constructor(){
    super()

    this.state = {
      status: '',
      email: '',
      phone: '',
      city: '',
      us_state: '',
      boat_info: '',
      about_me: '',
      club_position: '',
      open: false,
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  };

  componentDidMount() {
    axios.get('/api/user_session').then(res =>
      res.data.passport ?
        this.props.getUser() &&
        this.props.getUserInfo().then(res => {
          this.setState({
            status: res.value.user_status,
            email: res.value.email,
            phone: res.value.phone,
            city: res.value.city,
            us_state: res.value.us_state,
            boat_info: res.value.boat_info,
            about_me: res.value.about_me,
            club_position: res.value.club_position
          });
        })
      : this.props.history.push("/")
    );
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleSubmit(){
    const {status, email, phone, city, us_state, boat_info, about_me, club_position} = this.state;
    if (this.props.user_info.user_id){
      axios.put('/api/edit_profile/' + this.props.user_info.user_id, 
      {status, email, phone, city, us_state, boat_info, about_me, club_position}).then( () => this.props.getUserInfo());
      this.handleClose()
    } else {
      axios.post('/api/create_profile/', 
      {status, email, phone, city, us_state, boat_info, about_me, club_position}).then( () => this.props.getUserInfo());
      this.handleClose()
    }
  };

  handleChange(event) {
    this.setState( { [event.target.name]: event.target.value});
  };

  render() {

    const actions = [
      <FlatButton
        backgroundColor="rgb(209, 4, 4)"
        labelStyle={{color: 'white'}}
        hoverColor={{color: 'rgb(209, 4, 4)'}}
        style={{marginLeft: 50}}
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
      <FlatButton
        backgroundColor="rgb(29, 82, 142)"
        labelStyle={{color: 'white'}}
        hoverColor={{color: 'rgb(29, 82, 142)'}}
        style={{marginLeft: 50, marginRight: 240 }}
        label="Submit"
        primary={true}
        onClick={this.handleSubmit}
      />
    ];

    const styles = {
      card: {
        height: '500px',
        width: '500px',  
      }
    };

    const mediaTitleStyles = {
      title: {
        fontSize: 32,
        padding: 5,
        fontFamily: '""'
      },
      subtitle: {
        fontSize: 24,
        paddingLeft: 8,
        fontFamily: '""',
      },
      bottomtitle: {
        fontSize: 30,
        paddingLeft: 0,
        fontFamily: '""',
      }
    };

    return (
      <div> 
          <div className='profile-page'>
            <DashHeader component_title='PROFILE'/>
            <div className='profile-section'>
              <div className='profile-card-1'>
                <Card style={styles.card}>
                  <CardHeader  
                    titleStyle = {mediaTitleStyles.title}
                    subtitleStyle={mediaTitleStyles.subtitle}  
                    title={this.props.user.display_name} subtitle={this.state.club_position}/>
                  <CardMedia 
                    overlay={
                      <CardTitle 
                        titleStyle = {mediaTitleStyles.bottomtitle} 
                        title={`${this.props.user_info.city}, 
                        ${this.props.user_info.us_state}`}
                      />
                    } 
                  >
                    <img src={this.props.user.img} width='500px' height= '500px' alt="profile pic" />
                  </CardMedia>
                </Card>
              </div>
                                
              <div className='profile-card-2'>
                <div className='profile-info'>
                  <div className='profile-info-header'>
                    {this.props.user_info.user_status}
                  </div>

                  <div className='profile-info-body'>
                    <div className='profile-info-section'>
                      <div className='info-title'>About</div>
                      <div className='info-child'>{this.props.user_info.about_me}</div>
                    </div>

                    <div className='profile-info-section'>
                      <div className='info-title'>Boat Info</div>
                      <div className='info-child'>{this.props.user_info.boat_info}</div>
                    </div>
                    
                    <div className='profile-info-section'>
                      <div className='info-title'>Contact</div>
                      <div className='info-child'>{this.props.user_info.email}</div>
                      <div className='info-child'>{this.props.user_info.phone}</div>
                    </div>

                    <div className='profile-info-section'>
                      <div className='info-title'>Club Position</div>
                      <div className='info-child'>{this.props.user_info.club_position}</div>
                    </div>
                  </div>

                  <div className='edit-button-box'>
                    <RaisedButton backgroundColor="rgb(29, 82, 142)" labelColor="white" label="Edit Profile" onClick={this.handleOpen} />
                    <Dialog
                      title="Edit Profile Info"
                      actions={actions}
                      modal={true}
                      open={this.state.open}
                    >
                      <form className='modal-form'>
                        <TextField onChange={this.handleChange } defaultValue={this.state.status} floatingLabelText="Status" name='status'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.email} floatingLabelText="Email" name='email'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.phone} floatingLabelText="Phone Number" name='phone'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.city} floatingLabelText="City" name='city'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.us_state} floatingLabelText="State" name='us_state' maxLength='2'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.boat_info} floatingLabelText="Boat Info" name='boat_info' />
                        <TextField onChange={this.handleChange } multiLine='true' rows='10' defaultValue={this.state.about_me} floatingLabelText="Write something about yourself" name='about_me' />
                        <TextField onChange={this.handleChange } defaultValue={this.state.club_position} floatingLabelText="Club Position" name='club_position' />

                      </form>
                    </Dialog>    
                  </div>      
                </div>                                
              </div>   
            </div>
            <ProfileFooter/>
          </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    user_info: state.user_info
  }
};

export default connect(mapStateToProps, {getUser, getUserInfo})(Profile)