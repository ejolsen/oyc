import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import headerLogo from '../../images/oyc_logo_red.svg';
import LoginButton from './LoginButton';


class SplashHeader extends Component {
  constructor() {
    super();

    this.state = {
    };
  };
  
  render() {
    return (
        <header className="splash-header-1">
            <div>
                <Link to='/'>
                    <img src={headerLogo} className='splash-logo' alt="club logo" />
                </Link>
            </div>

            <div className='header-title'>{this.props.component_title}</div>
            

            <div className='splash-links'>
                <Link to='/about'>
                    {this.props.component_title === 'CLUB INFO' ? 
                    <button className='splash-header-button-on'>Our Club</button> : 
                    null}
                    {this.props.component_title === 'CLUB INFO' ? 
                    null : 
                    <button className='splash-header-button'>Our Club</button>}
                </Link>

                <Link to='/membership'>
                    {this.props.component_title === 'MEMBERSHIP' ? 
                    <button className='splash-header-button-on'>Membership</button> : 
                    null}
                    {this.props.component_title === 'MEMBERSHIP' ? 
                    null : 
                    <button className='splash-header-button'>Membership</button>}
                </Link>

                <Link to='/events'>
                    {this.props.component_title === 'CALENDAR' ? 
                    <button className='splash-header-button-on'>Calendar</button> : 
                    null}
                    {this.props.component_title === 'CALENDAR' ? 
                    null : 
                    <button className='splash-header-button'>Calendar</button>}
                </Link>
                
                <LoginButton/>
            </div>
        </header>
    )
  };

};
  
export default SplashHeader