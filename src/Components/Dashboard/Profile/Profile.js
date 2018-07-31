import './profile.css';
import React, { Component } from 'react';
import axios from 'axios';
import DashHeader from '../Header/DashHeader';
import {connect} from 'react-redux';
import {getUser, getUserInfo} from '../../../redux/reducer';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import Dropzone from 'react-dropzone'; 
import {Link} from 'react-router-dom';

class Profile extends Component {
  constructor(){
    super()
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
      open_profile_edit: false,
      open_upload_pic: false
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
            user_id: res.value.user_id,
            profile_img: res.value.profile_img,
            status: res.value.user_status,
            email: res.value.email,
            phone: res.value.phone,
            city: res.value.city,
            us_state: res.value.us_state,
            boat_info: res.value.boat_info,
            about_me: res.value.about_me,
            club_position: res.value.club_position,
            boat_type: res.value.boat_type,
            boat_length: res.value.boat_length,
            boat_name: res.value.boat_name,
          });
        })
      : this.props.history.push("/")
    );
  };

  handleChange(event) {
    this.setState({[event.target.name]: event.target.value});
  };

  handleSubmit() {
    const {status, email, phone, city, us_state, boat_info, about_me, club_position, profile_img, boat_type, boat_length, boat_name} = this.state;
    axios.put('/api/edit_profile/' + this.props.user_info.user_id, 
    {status, email, phone, city, us_state, boat_info, about_me, club_position, profile_img, boat_type, boat_length, boat_name}).then( () => this.props.getUserInfo());
    this.handleClose()
  };

  handleOpen = () => {
    this.setState({open_profile_edit: true});
  };

  openPictureEdit = () => {
    this.setState({open_profile_edit: false});
    this.setState({open_upload_pic: true});
  };

  handleClose = () => {
    this.setState({open_profile_edit: false});
    this.setState({open_upload_pic: false});
  };

  onDrop = files => {
    let {REACT_APP_CLOUD_PRESET, REACT_APP_CLOUD_KEY, REACT_APP_CLOUD_NAME} = process.env;
    const uploaders = files.map(file => {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", REACT_APP_CLOUD_PRESET); 
      formData.append("api_key", REACT_APP_CLOUD_KEY); 
      formData.append("timestamp", (Date.now() / 1000) | 0);
      formData.append("public_id", file.name);
    
      return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload/`, formData, {headers: { "X-Requested-With": "XMLHttpRequest" }}).then(res => {
        const pictureURL = res.data.url
        const user_id = this.state.user_id
        axios.put(`/api/post/picture/${user_id}`, {pictureURL}).then ( () => {
          this.handleClose()
        });
        window.location.reload();
      });
    });
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

    const actions_picture = [
      <FlatButton
        backgroundColor="rgb(209, 4, 4)"
        labelStyle={{color: 'white'}}
        hoverColor={{color: 'rgb(209, 4, 4)'}}
        style={{marginRight: '45%' }}
        label="Cancel"
        primary={true}
        onClick={this.handleClose}
      />,
    ];

    return (
      <div> 
          <div className='profile-page'>
            <DashHeader component_title='PROFILE'/>
            <div className='profile-section'>                           
              <div className='profile-card-section'>
                <div className='profile-card-left-section'>
                  <div className='profile-card-pic-section'>
                    <div className='profile-card-pic-title'>
                      {this.props.user.display_name}
                      <Dialog
                        title="Upload Profile Pic"
                        actions={actions_picture}
                        modal={true}
                        open={this.state.open_upload_pic}
                      >
                        <form className='modal-form'>
                          <Dropzone 
                              onDrop={this.onDrop} 
                              style={{
                                  width: "300px", 
                                  height: '300px', 
                                  border: "dashed 1px black", 
                                  display: "flex", 
                                  justifyContent: 'center', 
                                  alignItems: 'center',
                                  marginTop: '20px',
                                  cursor: 'pointer'
                              }}>
                              <p className='dropbox-title'>CLICK HERE TO UPLOAD PHOTO</p>
                          </Dropzone>
                        </form>
                      </Dialog> 
                    </div>
                    <img className='profile-card-pic'src={this.props.user_info.profile_img} alt="profile pic" />
                    <div className='profile-card-pic-position'>{this.state.club_position}</div>
                  </div>
                  <div className='profile-card-contact'>
                      <div className='profile-card-contact-title'>Member Contact</div>
                      <div className='profile-card-contact-info'>Email: {this.props.user_info.email}</div>
                      <div className='profile-card-contact-info'>Phone: {this.props.user_info.phone}</div>
                      <div className='profile-card-contact-info'>Location: {`${this.props.user_info.city}, ${this.props.user_info.us_state}`}</div>
                  </div>
                </div>
                <div className='profile-card-info'>
                  <div className='status-bar'>
                    <div className='status-title'>{this.props.user_info.user_status}</div>
                  </div>
                  <div className='pro-info'>
                    <div className='pro-info-top'>
                      <div className='pro-info-title'>Boat Type</div>
                      <div className='pro-info-info'>{this.props.user_info.boat_type}</div>
                      <div className='pro-info-title'>Boat Length</div>
                      <div className='pro-info-info'>{this.props.user_info.boat_length}'</div>
                      <div className='pro-info-title'>Boat Name</div>
                      <div className='pro-info-info'>{this.props.user_info.boat_name}</div>
                    </div>
                    <div className='pro-info-bottom'>
                      <div className='pro-info-title'>About</div>
                      <div className='pro-info-info-about'>{this.props.user_info.about_me}</div>
                    </div>
                  </div>
                  <div className='pro-settings'> 
                    <button className='profile-edit-button' onClick={this.handleOpen}>Edit Info</button>
                    <button className='profile-edit-button' onClick={this.openPictureEdit}>Upload Photo</button>
                    <Link to='/settings'><button className='profile-account-button'>Account Settings</button></Link>
                    <Dialog
                      title="Edit Profile Info"
                      actions={actions}
                      modal={true}
                      open={this.state.open_profile_edit}
                    >
                      <form className='modal-form'>
                        <TextField onChange={this.handleChange } defaultValue={this.state.status} floatingLabelText="Status" name='status' maxLength='60'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.email} floatingLabelText="Email" name='email'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.phone} floatingLabelText="Phone Number" name='phone'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.city} floatingLabelText="City" name='city'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.us_state} floatingLabelText="State" name='us_state' maxLength='2'/>
                        <TextField onChange={this.handleChange } defaultValue={this.state.boat_type} floatingLabelText="Boat Type" name='boat_type' />
                        <TextField onChange={this.handleChange } defaultValue={this.state.boat_length} floatingLabelText="Boat Length (in feet)" name='boat_length' />
                        <TextField onChange={this.handleChange } defaultValue={this.state.boat_name} floatingLabelText="Boat Name" name='boat_name' />
                        <TextField onChange={this.handleChange } defaultValue={this.state.club_position} floatingLabelText="Club Position" name='club_position' />
                        <TextField onChange={this.handleChange } multiLine='true' rows='10' defaultValue={this.state.about_me} floatingLabelText="Write something about yourself" name='about_me' />
                      </form>
                    </Dialog>    
                  </div>
                </div>
              </div>   
            </div>
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