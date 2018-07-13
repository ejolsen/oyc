import './splash.css';
import React from 'react';
import mobileLogo from '../../images/oyc_mobile.jpg';
import desktopLogo from '../../images/splash_01.jpg';
import footerLogo from '../../images/Screen Shot 2018-05-08 at 2.30.55 PM.png';
import footerLogo1 from '../../images/timthumb.jpeg';
import SplashHeader from './SplashHeader';

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

            <footer className='footer'>
            <div></div>

                <div className='footer-body'>
                    <div className='splash-footer-icon'>
                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-3 7h-1.924c-.615 0-1.076.252-1.076.889v1.111h3l-.238 3h-2.762v8h-3v-8h-2v-3h2v-1.923c0-2.022 1.064-3.077 3.461-3.077h2.539v3z"/>
                            </svg>
                        </div>

                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M4.652 0h1.44l.988 3.702.916-3.702h1.454l-1.665 5.505v3.757h-1.431v-3.757l-1.702-5.505zm6.594 2.373c-1.119 0-1.861.74-1.861 1.835v3.349c0 1.204.629 1.831 1.861 1.831 1.022 0 1.826-.683 1.826-1.831v-3.349c0-1.069-.797-1.835-1.826-1.835zm.531 5.127c0 .372-.19.646-.532.646-.351 0-.554-.287-.554-.646v-3.179c0-.374.172-.651.529-.651.39 0 .557.269.557.651v3.179zm4.729-5.07v5.186c-.155.194-.5.512-.747.512-.271 0-.338-.186-.338-.46v-5.238h-1.27v5.71c0 .675.206 1.22.887 1.22.384 0 .918-.2 1.468-.853v.754h1.27v-6.831h-1.27zm2.203 13.858c-.448 0-.541.315-.541.763v.659h1.069v-.66c.001-.44-.092-.762-.528-.762zm-4.703.04c-.084.043-.167.109-.25.198v4.055c.099.106.194.182.287.229.197.1.485.107.619-.067.07-.092.105-.241.105-.449v-3.359c0-.22-.043-.386-.129-.5-.147-.193-.42-.214-.632-.107zm4.827-5.195c-2.604-.177-11.066-.177-13.666 0-2.814.192-3.146 1.892-3.167 6.367.021 4.467.35 6.175 3.167 6.367 2.6.177 11.062.177 13.666 0 2.814-.192 3.146-1.893 3.167-6.367-.021-4.467-.35-6.175-3.167-6.367zm-12.324 10.686h-1.363v-7.54h-1.41v-1.28h4.182v1.28h-1.41v7.54zm4.846 0h-1.21v-.718c-.223.265-.455.467-.696.605-.652.374-1.547.365-1.547-.955v-5.438h1.209v4.988c0 .262.063.438.322.438.236 0 .564-.303.711-.487v-4.939h1.21v6.506zm4.657-1.348c0 .805-.301 1.431-1.106 1.431-.443 0-.812-.162-1.149-.583v.5h-1.221v-8.82h1.221v2.84c.273-.333.644-.608 1.076-.608.886 0 1.18.749 1.18 1.631v3.609zm4.471-1.752h-2.314v1.228c0 .488.042.91.528.91.511 0 .541-.344.541-.91v-.452h1.245v.489c0 1.253-.538 2.013-1.813 2.013-1.155 0-1.746-.842-1.746-2.013v-2.921c0-1.129.746-1.914 1.837-1.914 1.161 0 1.721.738 1.721 1.914v1.656z"/>
                            </svg>
                        </div>

                        <div className='icon'>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11.984 16.815c2.596 0 4.706-2.111 4.706-4.707 0-1.409-.623-2.674-1.606-3.538-.346-.303-.735-.556-1.158-.748-.593-.27-1.249-.421-1.941-.421s-1.349.151-1.941.421c-.424.194-.814.447-1.158.749-.985.864-1.608 2.129-1.608 3.538 0 2.595 2.112 4.706 4.706 4.706zm.016-8.184c1.921 0 3.479 1.557 3.479 3.478 0 1.921-1.558 3.479-3.479 3.479s-3.479-1.557-3.479-3.479c0-1.921 1.558-3.478 3.479-3.478zm5.223.369h6.777v10.278c0 2.608-2.114 4.722-4.722 4.722h-14.493c-2.608 0-4.785-2.114-4.785-4.722v-10.278h6.747c-.544.913-.872 1.969-.872 3.109 0 3.374 2.735 6.109 6.109 6.109s6.109-2.735 6.109-6.109c.001-1.14-.327-2.196-.87-3.109zm2.055-9h-12.278v5h-1v-5h-1v5h-1v-4.923c-.346.057-.682.143-1 .27v4.653h-1v-4.102c-1.202.857-2 2.246-2 3.824v3.278h7.473c1.167-1.282 2.798-2 4.511-2 1.722 0 3.351.725 4.511 2h7.505v-3.278c0-2.608-2.114-4.722-4.722-4.722zm2.722 5.265c0 .406-.333.735-.745.735h-2.511c-.411 0-.744-.329-.744-.735v-2.53c0-.406.333-.735.744-.735h2.511c.412 0 .745.329.745.735v2.53z"/>
                            </svg>
                        </div>
                    </div>

                    {/* <div className='footer-info'>
                        <div>OUTRIGGER YACHT CLUB · 923 BASIN ROAD CAROLINA BEACH, NC 28428 · 910.707.1007</div>
                    </div>

                    <div className='footer-copy'>
                        Copyright © 2018 All Rights Reserved · Site By Hypermonk Design
                    </div> */}
                </div>

            </footer>

            

        </div>
    );
};