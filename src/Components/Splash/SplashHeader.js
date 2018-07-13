import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import headerLogo from '../../images/oyc_logo_red.svg';
import LoginButton from './LoginButton';


class Splash_Header extends Component {
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
            
            <div className='splash-links'>
                <div className="adropdown">
                    <button className="adropbtn">Our Club</button>
                    <div className="adropdown-content">
                        <Link to='/about'>About Us</Link>
                        <a href="#">Rules and Guidelines</a>
                        <a href="#">Contact</a>
                    </div>
                </div>

                <Link to='/membership'>
                    <button className='splash-header-button'>Membership</button>
                </Link>
                <Link to='/calendar'>
                    <button className='splash-header-button'>Calendar</button>
                </Link>
                
                <LoginButton/>
            </div>
        </header>
    )
  };

};
  
export default Splash_Header