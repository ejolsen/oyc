import React, {Component} from 'react';
import axios from 'axios';

class UserTools extends Component {
    constructor() {
        super();

        this.state = {
        };
    };

    componentDidMount() {
        axios.get()
    };
  
    render() {
        return (   
            <div className='application-main-section'>         
                <div className='application-container'>
                    <div>Page Not Available</div>
                </div>
            </div>    
        )
    };

};
  
export default UserTools