import React, { Component } from 'react';
import DashHeader from '../Header/DashHeader';
import './calendar.css';
import axios from 'axios';

class Calendar extends Component {
    constructor(){
        super()

        this.state = {

        }
    };

    componentDidMount() {
        axios.get('/api/user_session').then(res =>
          res.data.passport ?
            console.log('User Verified: Access Granted')
          : this.props.history.push("/")
        );
    };

    render() {
        return (
            <div>
                <DashHeader component_title='CALENDAR'/>
                <div className='calendar-frame'>
                    <iframe 
                        src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=oyc.official%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FNew_York" width="1200" height="800" frameborder="0" scrolling="no">
                    </iframe>
                </div>   
            </div>
        )
    }
}

export default Calendar