import React, {Component} from 'react';
import axios from 'axios';
import DashHeader from '../Dashboard/Header/DashHeader';
import DocTools from './Admin_Sub_Comp/DocTools';
import AppTools from './Admin_Sub_Comp/AppTools';
import UserTools from './Admin_Sub_Comp/UserTools';

class Admin extends Component {
    constructor() {
        super();

        this.state = {
            doc_button: true,
            app_button: false,
            users_button: false,
        };
        this.docSwitch = this.docSwitch.bind(this);
        this.appSwitch = this.appSwitch.bind(this);
        this.usersSwitch = this.usersSwitch.bind(this);
    };

    componentDidMount() {
        axios.get('/api/user_session').then(res =>
            !res.data.passport 
            ? this.props.history.push("/")
            : res.data.passport.user === 6
            ? console.log('Admin Verified: Access Granted') 
            : this.props.history.push('/profile')
        );
    };

    docSwitch() {
        this.setState({
            doc_button: true,
            app_button: false,
            users_button: false,
        })
    }

    appSwitch() {
        this.setState({
            doc_button: false,
            app_button: true,
            users_button: false,
        })
    }

    usersSwitch() {
        this.setState({
            doc_button: false,
            app_button: false,
            users_button: true,
        })
    }
  
  render() {
      console.log(this.state)
    return (
        <div>
            <DashHeader component_title = 'ADMIN TOOLBOX'/>
            <div className='admin-tools-header'>
                <div className="admin-button-set">
                    <div className='admin-tool-buttons' onClick={this.docSwitch}>
                        { this.state.doc_button 
                            ? <div className='admin-switch-on'>DOCUMENTS</div> 
                            : <div className='admin-switch-off'>DOCUMENTS</div>}
                    </div>
                    <div className='admin-tool-buttons' onClick={this.usersSwitch}>
                        { this.state.users_button 
                            ? <div className='admin-switch-on'>USERS</div> 
                            : <div className='admin-switch-off'>USERS</div>}
                    </div>
                    <div className='admin-tool-buttons' onClick={this.appSwitch}>
                        { this.state.app_button 
                            ? <div className='admin-switch-on'>APPLICATIONS</div> 
                            : <div className='admin-switch-off'>APPLICATIONS</div>}
                    </div>
                </div>
            </div>
            <div className='admin-body'>
                {this.state.doc_button 
                    ? <DocTools/>
                    : null
                }
                {this.state.app_button 
                    ? <AppTools/>
                    : null
                }
                {this.state.users_button 
                    ? <UserTools/>
                    : null
                }
            </div>
        </div>
        
    )
  };

};
  
export default Admin