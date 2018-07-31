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
       this.grabApplications()
    };

    grabApplications() {
        axios.get('/api/applications').then ( res => {
            this.setState({
                applications: res.data
            })
        })
    };

    approveApplication(id) {
        axios.post(`/api/application_status/${id}`).then ( () => {
            this.grabApplications()
        })
    };

    appVisible() {
        this.setState({
            appHidden: !this.state.appHidden
        })
    };

    render() {

        const new_apps = this.state.applications.filter( application => 
            application.application_status === 'pending'
        ) 

        const old_apps = this.state.applications.filter( application => 
            application.application_status === 'approved'
        ) 

        console.log(this.state.applications)

        let all_new_applications = new_apps.map( (application) => {
            return (
                <div key={application.id} className={this.state.appHidden ? 'application-card-hidden' : 'application-card'}>
                    { this.state.appHidden 
                        ? 
                        <div className='application-card-hidden-info'>
                            <div className='application-card-title'>{`NAME: ${application.last_name},  ${application.first_name}`}</div>
                            <div className='application-card-title'>DATE SUBMITTED: {application.date_submitted}</div>
                            <div className='application-card-title'>STATUS: {application.application_status}</div>
                            <button className='application-button-set-close-close' onClick={this.appVisible}>Open</button>
                        </div> 
                        : 
                        <div className='application-card-visible-info'>
                            <div className='application-card-visible-info-top'>
                                <div>
                                    <div className='application-card-title-visible'>{`NAME: ${application.last_name},  ${application.first_name}`}</div>
                                    <div className='application-card-title-visible'>EMAIL: {application.email}</div>
                                    <div className='application-card-title-visible'>DATE SUBMITTED: {application.date_submitted}</div>
                                </div>
                                <div>
                                    <div className='application-card-title-visible'>CITY: {application.city}</div>
                                    <div className='application-card-title-visible'>STATE: {application.us_state}</div>
                                    <div className='application-card-title-visible'>MEMBER TYPE: {application.membership_type}</div>
                                    <div className='application-card-title-visible'>STATUS: {application.application_status}</div>
                                </div>
                            </div>
                           
                            <div className='application-card-visible-info-button-set'>
                                <button className='application-button-set-approve' onClick={() => this.approveApplication(application.id)}>APPROVE</button>
                                <button  className='application-button-set-deny'>DENY</button>
                                <button  className='application-button-set-close' onClick={this.appVisible}>CLOSE</button>
                            </div>
                            
                        </div>
                    }
                </div>
            );
        });

        let all_old_applications = old_apps.map( (application) => {
            return (
                <div key={application.id} className={'application-card-hidden'}>
                    <div className='application-card-hidden-info'>
                        <div className='application-card-title'>{`NAME: ${application.last_name},  ${application.first_name}`}</div>
                        <div className='application-card-title'>DATE SUBMITTED: {application.date_submitted}</div>
                        <div className='application-card-title'>STATUS: {application.application_status}</div>
                        <button className='application-button-set-close-close' onClick={this.appVisible}>Open</button>
                    </div> 
                </div>
            );
        });

        return (   
            <div className='application-main-section'>         
                <div className='application-container'>
                    <div className='application-container-title'>
                        <div className='application-title'>New Applications</div>
                    </div>
                    <div className='new-applications-box'>
                        {all_new_applications}
                    </div>
                </div>
                <div className='application-container'>
                    <div className='application-container-title'>
                        <div className='application-title'>Old Applications</div>
                    </div>
                    <div className='old-applications-box'>
                        {all_old_applications}
                    </div>
                </div> 
            </div>    
        )
    };
};
  
export default AppTools