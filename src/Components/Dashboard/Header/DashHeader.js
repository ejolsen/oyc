import React, { Component } from 'react';
import DashMenu from './DashMenu';
import clubLogo from '../../../images/oyc_logo_red.svg';
import './headers.css';
import axios from 'axios';
import {Link} from 'react-router-dom';

class DashHeader extends Component {
    constructor() {
        super();
        
        this.state = {
            admin: false
        }
    };

    componentDidMount() {
        axios.get('/api/user_session').then(res =>
            !res.data.passport 
            ? this.setState({admin: false})
            : res.data.passport.user === 6 
            ? this.setState({admin: true})
            : this.setState({admin: false})
        );
    };

    render(){
        return (
            <div>
                <header className="dash-header">
                    <div>
                        <img className='dash-logo-pic' alt="club logo" src={clubLogo} />
                    </div>
                    <div className='component-title'>{this.props.component_title}</div>
                    <DashMenu component_title={this.props.component_title}/>
                </header>
                { 
                    this.state.admin 
                    ? 
                    <header className="admin-header">                   
                       <div className="admin-nav">
                            <Link to='/admin'>
                                <div className="admin-nav-link">ADMIN TOOLS</div>
                            </Link>
                        </div>
                        <div className="admin-nav">Adminstrator Account</div>
                    </header> 
                    : 
                    null
                }
            </div>
        )
    }
};

export default DashHeader