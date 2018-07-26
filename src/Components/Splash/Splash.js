import './splash.css';
import React from 'react';
import mobileLogo from '../../images/oyc_mobile.jpg';
import desktopLogo from '../../images/splash_01.jpg';
import footerLogo from '../../images/Screen Shot 2018-05-08 at 2.30.55 PM.png';
import footerLogo1 from '../../images/timthumb.jpeg';
import SplashHeader from './SplashHeader';
import SplashFooter from './SplashFooter';

export default function Splash() {
    return (
        <div className='splash-body'>
            <SplashHeader/>
            <div className='header-buffer'></div>
            <div className="title-bar-1">
                <div>OUTRIGGER YACHT CLUB</div>
            </div>
            <div className="title-bar-2">
                The Outrigger Yacht Club (OYC) promotes seamanship, friendly competition and social activities for sailors on Lake Norman, NC. Membership is affordable and open to anyone with an interest in sailing.
            </div>

           
            <div className='splash-content-img'>
                <img  className='desktop-splash-img' src={desktopLogo} alt="splash_background" />

                <img  className='mobile-splash-img' src={mobileLogo} alt="splash_background" />

                <div className='splash-bio'>
                    <p className='splash-bio-content'>
                        The Outrigger Yacht Club (OYC) promotes seamanship, friendly competition and social activities for sailors on Lake Norman, NC. Membership is affordable and open to anyone with an interest in sailing.
                    </p> 
                    {/* CAROUSEL */}
                </div>
            </div>

            <div className='splash-content'>
                <div className='container'> 
                    <div className='centered'>{`Our Club`}</div>
                </div>
                <div className='container'>
                    <div className="centered">{`Sailing & Regattas`}</div>
                </div>
                <div className='container'>
                    <div className='centered'>{`Membership`}</div>
                </div>     
                <div className='container'>
                    <div className='centered'>{`Newsletter`}</div>
                </div>    
            </div>
             
            <div className='video-section'>
                <div className='video-div'>
                    <div className='frame-div'>
                        <iframe width="100%" height="100%"
                            src="https://www.youtube.com/embed/4OQtU8dMzAU?&autoplay=1&mute=1&rel=0&amp;controls=0&amp;showinfo=0&amp;start=30" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen>
                        </iframe>
                    </div>
                    <div className='video-text'>
                        Escape to your new life on the water!
                    </div>
                </div>
            </div>

            <div className='footer-logo-bar'>
                <div className='footer-logo'>
                    <img src={footerLogo} alt='footer-logo' height='100px' width='100px'  /> 
                </div>
                <img src={footerLogo1} alt='footer-logo' height='100px' width='130px' />
            </div>

            <SplashFooter/>

            

        </div>
    );
};