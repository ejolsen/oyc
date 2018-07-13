import React from 'react';
import LoginButton from '../Splash/LoginButton';
import clubLogo from '../../images/oyc_logo_red.png';
import {Link} from 'react-router-dom';

export default function About(){
    return (
        <div>
            <header className="splash-header">
                <div>
                    <img src={clubLogo} className='splash-logo' alt="club logo" />
                </div>
                
                <div className='splash-links'>
                    <div className="dropdown">
                        <button className="dropbtn">Our Club</button>
                        <div className="dropdown-content">
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

            


        </div>
    )
}