import React, {Component} from 'react';
import axios from 'axios';

class AppTools extends Component {
    constructor() {
        super();

        this.state = {
            applications: [],
            appHidden: true
        };
        this.appVisible = this.appVisible.bind(this);
    };

    componentDidMount() {
        axios.get('/api/applications'). then ( res => {
            this.setState({
                applications: res.data
            })
        })
    };

    appVisible() {
        this.setState({
            appHidden: !this.state.appHidden
        })
    }

    render() {
        let all_applications = this.state.applications.map( (application) => {
            return (
                <div key={application} className={this.state.appHidden ? 'application-card-hidden' : 'application-card'}>
                    { this.state.appHidden 
                        ? 
                        <div className='application-card-hidden-info'>
                            <div className='application-card-title'>{`NAME: ${application.last_name},  ${application.first_name}`}</div>
                            <div className='application-card-title'>DATE SUBMITTED: {application.date_submitted}</div>
                            <div className='application-card-title'>STATUS: {application.application_status}</div>
                            <button onClick={this.appVisible}>Open</button>
                        </div> 
                        : 
                        <div className='application-card-visible-info'>
                            information here
                            <button onClick={this.appVisible}>close</button>
                        </div>
                    }
                </div>
            );
        });

        return (   
            <div className='application-main-section'>         
                <div className='application-container'>
                    <div className='new-applications-box'>
                        {all_applications}
                    </div>
                    <div className='old-applications-box'>
                        
                    </div>
                </div>
            </div>    
        )
    };
};
  
export default AppTools


// let all_applications = this.state.applications.map( (application) => {
//     return (
//         <div onClick={this.appVisible} key={application} className='application-card'>
//             { this.state.appHidden 
//                 ? 
//                 <div className='application-card-hidden'>
//                     <div className='application-card-title'>{`${application.last_name}, ${application.first_name}`}</div>
//                 </div> 
//                 : 
//                 <div className='application-card-visible'>
//                     information here
//                     <button onClick={this.appVisible}>close</button>
//                 </div>
//             }
//         </div>
//     );
// });