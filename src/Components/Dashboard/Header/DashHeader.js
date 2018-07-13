import React from 'react';
import DashMenu from './DashMenu';
import clubLogo from '../../../images/oyc_logo_red.svg';
import './headers.css';


export default function DashHeader() {
    return (
        <div>
            <header className="dash-header">
                <div>
                <img className='dash-logo-pic' alt="club logo" src={clubLogo} />
                </div>
                
                <DashMenu/>
            </header>
        </div>
    )
};