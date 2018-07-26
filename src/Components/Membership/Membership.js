import './membership.css';
import React, {Component} from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import SplashHeader from '../Splash/SplashHeader';
import PDFicon from '../../images/pdf.svg';

class Membership extends Component {
    constructor(){
        super()

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            phone: '',
            city: '',
            us_state: '',
            zip_code: '',
            boat_name: '',
            boat_type: '',
            member_type: '',
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
        const {first_name, last_name, email, phone, city, us_state, zip_code, boat_name, boat_type, member_type} = this.state
        let date = new Date()
        let application_status = 'pending'
        let application =  {first_name, last_name, email, phone, city, us_state, zip_code, boat_name, boat_type, date, application_status, member_type}
        let applicant_data = {first_name, last_name, email}
        axios.post('/api/submit_application', application).then( () => {
            this.handleClose()
        })
        axios.post('/api/email_admin', applicant_data)
        axios.post('/api/email_applicant', applicant_data)
    };

    handleChange(event) {
        this.setState( { [event.target.name]: event.target.value});
    };

    render() {

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
                <SplashHeader component_title='MEMBERSHIP'/>
                <div className='header-buffer'></div>

                <div className='member-app'>
                    <div className='membership-info'>
                        <div className='membership-p'>
                            {`The Outrigger Yacht Club invites sailors interested in membership to contact the OYC's Membership Chairperson at`} <a href='mailto:oyc.official@gmail.com'>oyc.official@gmail.com</a> {`with questions regarding membership. The club also encourages prospective members to review the OYC's policies on club membership. Follow the links below for club policies and membership applications.`}
                        </div>

                        <div className='member-submit-apply'>
                                <div className='online-app-title'>Click here to Apply Online</div>
                                <RaisedButton backgroundColor="rgb(209, 4, 4)" labelColor="#ffffff" label="Apply For Membership" onClick={this.handleOpen} />
                                <Dialog
                                    title="Apply For Membership"
                                    actions={actions}
                                    modal={true}
                                    open={this.state.open}
                                >
                                    <form className='modal-form'>
                                        <TextField onChange={this.handleChange } floatingLabelText="First Name" name='first_name'/>
                                        <TextField onChange={this.handleChange } floatingLabelText="Last Name" name='last_name'/>
                                        <TextField onChange={this.handleChange } floatingLabelText="Email" name='email'/>
                                        <TextField onChange={this.handleChange } floatingLabelText="Phone" name='phone'/>
                                        <TextField onChange={this.handleChange } floatingLabelText="City" name='city'/>
                                        <TextField onChange={this.handleChange } floatingLabelText="State" name='us_state' maxLength='2'/>
                                        <TextField onChange={this.handleChange } floatingLabelText="Zip Code" name='zip_code'/>
                                        <TextField onChange={this.handleChange } floatingLabelText="Boat Name" name='boat_name' />
                                        <TextField onChange={this.handleChange } floatingLabelText="Boat Type" name='boat_type' />
                                    </form>
                                    <form>
                                        <div>
                                            <input type="radio" name="member_type" id="associate_member" value="associate_member" onChange={this.handleChange }/>
                                            <label for="associate_member">Associate Membership</label>
                                        </div>
                                        <div>
                                            <input type="radio" name="member_type" id="full_member" value="full_member" onChange={this.handleChange }/>
                                            <label for="full_member">Full Membership</label>
                                        </div>
                                    </form>
                                </Dialog> 
                            </div>

                        <div className='membership-application-section'>
                            
                            <div className='member-submit'>
                                <div className='member-submit-title'>
                                    <div>Membership Policies</div>
                                    <img src={PDFicon} height='50px' width='50px'/>
                                </div>
                                <a href='https://res.cloudinary.com/oycadmin/image/upload/v1532397096/OYC_membership_policy.pdf.pdf' target="_blank" rel="noopener noreferrer">
                                    <img src='https://res.cloudinary.com/oycadmin/image/upload/c_thumb,w_320,g_face/v1532397096/OYC_membership_policy.png' alt='member_form' />
                                </a>
                            </div>

                            <div className='member-submit'>
                                <div className='member-submit-title'>
                                    <div>Membership Application</div>
                                    <img src={PDFicon} height='50px' width='50px'/>
                                </div>
                                
                                <a href='https://res.cloudinary.com/oycadmin/image/upload/v1532472110/OYC_Membership_Application.pdf.pdf' target="_blank" rel="noopener noreferrer">
                                    <img src='https://res.cloudinary.com/oycadmin/image/upload/c_thumb,w_320,g_face/v1532472110/OYC_Membership_Application.pdf.png' alt='member_form' />
                                </a>
                            </div>
                            
                        </div>
                        
                    </div>
                </div>
            </div>
        )
    }
}

export default Membership