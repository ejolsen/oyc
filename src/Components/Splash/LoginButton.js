import React from 'react';
import './splash.css'

export default function LoginButton() {
    return (
       
            <a href={process.env.REACT_APP_LOGIN}>
                <button className='login-button'>LOGIN</button>
            </a>   
    
    )
}