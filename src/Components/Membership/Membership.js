import './membership.css';
import React, {Component} from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SplashHeader from '../Splash/SplashHeader';
import Dropzone from 'react-dropzone';

class Membership extends Component {
    constructor(){
        super()

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            city: '',
            us_state: '',
            zip_code: '',
            boat_name: '',
            boat_type: '',
            open: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    
    handleSubmit(){
        const {first_name, last_name, email, city, us_state, zip_code, boat_name, boat_type} = this.state
        let date = new Date()
        let application =  {first_name, last_name, email, city, us_state, zip_code, boat_name, boat_type, date}
        axios.post('/api/submit_application', application).then ( (res) => {
            console.log(res)
            this.handleClose()
        })
    };

    handleChange(event) {
        this.setState( { [event.target.name]: event.target.value});
    };



    // onDrop = files => {
       
    //     let {REACT_APP_CLOUD_PRESET, REACT_APP_CLOUD_KEY, REACT_APP_CLOUD_NAME} = process.env;
    //     const uploaders = files.map(file => {

    //       const formData = new FormData();
    //       formData.append("file", file);
    //       formData.append("upload_preset", REACT_APP_CLOUD_PRESET); // Replace the preset name with your own
    //       formData.append("api_key", REACT_APP_CLOUD_KEY); // Replace API key with your own Cloudinary key
    //       formData.append("timestamp", (Date.now() / 1000) | 0);
          
    //       // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
    //       return axios.post(`https://api.cloudinary.com/v1_1/${REACT_APP_CLOUD_NAME}/image/upload`, formData, {
    //         headers: { "X-Requested-With": "XMLHttpRequest" },
    //       }).then(response => {
    //         const data = response.data;
    //         const fileURL = data.secure_url // You should store this URL for future references in your app
    //         console.log(file);
    //         this.setState({
    //             publicId: data.public_id,
    //             url: fileURL
    //         })
    //         console.log(data);
    //       })
    //     });
    // }
    

    render(){

 

        console.log(this.state)

        const actions = [
            <FlatButton
                backgroundColor="rgb(209, 4, 4)"
                labelStyle={{color: '#ffffff'}}
                style={{marginLeft: 50}}
                label="Cancel"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                backgroundColor="rgb(29, 82, 142)"
                labelStyle={{color: '#ffffff'}}
                style={{marginLeft: 50, marginRight: 240 }}
                label="Submit"
                primary={true}
                onClick={this.handleSubmit}
            />
        ];

        return (

            <div>
                <SplashHeader/>
                <div className='header-buffer'></div>

                <div className='member-app'>
                    <div className='membership-info'>
                        <div className='membership-title'>
                            MEMBERSHIP
                        </div>
                        <div className='membership-p'>
                        Non-members who request information regarding the
                        Club will be sent a letter/email of introduction to include a list of the various activities
                        sponsored by the club, the privileges and obligations of membership, information on the
                        various classes of membership available and respective annual assessments. The Club’s
                        standard membership application form is to be included along with this letter/email.
                        </div>

                        <div className='membership-title'>
                            MEMBERSHIP POLICIES
                        </div>

                        <div className='membership-p'>
                        Applications for membership will be submitted to
                        the Membership Committee in writing on the standard application form. Applications must
                        be complete and must include payment of all appropriate fees. Completed applications with
                        the Membership Committee’s recommendations will be forwarded to the Board of Trustees
                        for final action. In the event that the Trustees reject a completed application for
                        membership, all fees will be refunded to the applicant.
                        </div>

                        

                        
                        <div className='membership-application-section'>
                            <div className='member-submit'>
                                <h1>Apply Online</h1>
                                <RaisedButton backgroundColor="rgb(29, 82, 142)" labelColor="#ffffff" label="Apply For Membership" onClick={this.handleOpen} />
                                <Dialog
                                    title="Apply For Membership"
                                    actions={actions}
                                    modal={true}
                                    open={this.state.open}
                                >
                                    <form className='modal-form'>
                                        <TextField onChange={this.handleChange } hintText="FIRST NAME" floatingLabelText="First Name" name='first_name'/>

                                        <TextField onChange={this.handleChange } hintText="LAST NAME" floatingLabelText="Last Name" name='last_name'/>

                                        <TextField onChange={this.handleChange } hintText="EMAIL" floatingLabelText="Email" name='email'/>
                        
                                        <TextField onChange={this.handleChange } hintText="CITY" floatingLabelText="City" name='city'/>
                                        
                                        <TextField onChange={this.handleChange } hintText="STATE" floatingLabelText="State" name='us_state' maxLength='2'/>
                                        <TextField onChange={this.handleChange } hintText="ZIPCODE" floatingLabelText="Zip Code" name='zip_code'/>

                                        <TextField onChange={this.handleChange } hintText="BOAT NAME" floatingLabelText="Boat Name" name='boat_name' />
                                        <TextField onChange={this.handleChange } hintText="BOAT TYPE" floatingLabelText="Boat Type" name='boat_type' />
                                    </form>
                                </Dialog> 
                            </div>
                            

                            <div>
                                <a href='https://res.cloudinary.com/oycadmin/image/upload/v1531418400/oyc_docs/membershipform.pdf'  target="_blank">
                                    <img src='https://res.cloudinary.com/oycadmin/image/upload/c_thumb,w_200,g_face/v1531425344/oyc_docs/membershipform.png' />
                                </a>
                            </div>
                        </div>



                       
                        
                        {/* <Dropzone onDrop={this.onDrop} multiple accept='.pdf'>
                            <p>Drop your files or click here to upload</p>
                        </Dropzone> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Membership