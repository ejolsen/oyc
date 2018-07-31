import './settings.css';
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DashHeader from '../Header/DashHeader';
import Dialog from 'material-ui/Dialog';
import StripeCheckout from 'react-stripe-checkout';
import axios from 'axios';

class Settings extends Component {
    constructor(){
        super()
        this.state = {
            open: false,
            fee_amount: 200,
            user_id: '',
            profile_img: '',
            status: '',
            email: '',
            phone: '',
            city: '',
            us_state: '',
            boat_info: '',
            about_me: '',
            club_position: '',
            boat_type: '',
            boat_length: '',
            boat_name: '',
            fees_current: false
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        axios.get('/api/user_session').then(res =>
            res.data.passport 
            ?
            this.getMemberDues()
            : 
            this.props.history.push("/")
        );
    };

    getMemberDues() {
        axios.get('/api/user_profile_info').then(res => {
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
                fees_current: res.data.fees_current
            });
        })
    }

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    
    handleSubmit(){
        this.handleClose()
    };

    onToken = (token) => {
        token.card = void 0
        axios.post('/api/payment', {token, amount: this.state.fee_amount}).then(res => {
            axios.put(`/api/payment_update/${this.state.user_id}`).then( () => {
                this.getMemberDues()
                console.log("Membership Fees Paid")
            })
        })
    };

    render() {
console.log(this.state)
        const actions = [
            <FlatButton
                backgroundColor="rgb(209, 4, 4)"
                labelStyle={{color: 'white'}}
                hoverColor={{color: 'rgb(209, 4, 4)'}}
                style={{marginLeft: 50}}
                label="DELETE ACCOUNT"
                primary={true}
                href={`${window.location}/auth/logout`}
            />,
            <FlatButton
                backgroundColor="rgb(29, 82, 142)"
                labelStyle={{color: 'white'}}
                hoverColor={{color: 'rgb(29, 82, 142)'}}
                style={{marginLeft: 50, marginRight: 240 }}
                label="CANCEL"
                primary={true}
                onClick={this.handleClose}
            />
        ];

        return (
            <div>
                <DashHeader/>
                <div className='settings'>
                    <div className='settings-box'>
                        <div className='settings-title'>
                            Membership Dues
                        </div>
                        <div className='settings-body'>
                            {
                                this.state.fees_current
                                ?
                                <div className='member-good'>Your membership fees are up to date!</div>
                                : 
                                <div className='member-owes'>{`You account is past due in the amount of $${this.state.fee_amount}.00.` }</div>
                            }
                        </div>
                        <StripeCheckout
                            name="Outrigger Yacht Club"
                            description="Membership Fees"
                            image="http://via.placeholder.com/100x100"
                            token= {this.onToken}
                            stripeKey={process.env.REACT_APP_STRIPE_KEY}
                            amount={this.state.amount}
                        />
                    </div>
                    <div className='settings-box'>
                        <div className='settings-title'>
                            Account Settings
                        </div>
                        <div className='settings-body'>
                            Click below to delete your account.
                        </div>
                        <RaisedButton backgroundColor="rgb(209, 4, 4)" labelColor="white" label="Delete Account" onClick={this.handleOpen} />
                        <Dialog
                        title="WARNING: Deleting your account is final."
                        actions={actions}
                        modal={true}
                        open={this.state.open}
                        >
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    };
};

export default Settings