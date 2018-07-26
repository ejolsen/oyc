import React, {Component} from 'react';
import SplashHeader from './SplashHeader';

class About extends Component {
    constructor(){
        super()
        this.state = {
        }
    };

    render() {
        return (
            <div>
                <SplashHeader component_title='CLUB INFO'/>
                <div className='header-buffer'></div>
                <div className='about-body'>
                    <div className='about-main-section'>

                    </div>

                </div>

                
            </div>
        )
    }
}

export default About