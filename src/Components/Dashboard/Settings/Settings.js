import './settings.css';
import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import DashHeader from '../Header/DashHeader';
import Dialog from 'material-ui/Dialog';
import axios from 'axios';

class Settings extends Component {
    constructor(){
        super()

        this.state = {
            open: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    componentDidMount() {
        axios.get('/api/user_session').then(res =>
          res.data.passport ?
            console.log('User Verified: Access Granted')
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
        this.handleClose()
    };

    render(){

        const actions = [
            <FlatButton
                backgroundColor="rgb(209, 4, 4)"
                labelStyle={{color: 'white'}}
                hoverColor={{color: 'rgb(209, 4, 4)'}}
                style={{marginLeft: 50}}
                label="DELETE ACCOUNT"
                primary={true}
                href='http://localhost:7000/auth/logout'
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
            <div className='settings-footer'></div>
            </div>
        )
    }
}

export default Settings