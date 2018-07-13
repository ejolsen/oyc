import React from 'react';
import DashHeader from '../Header/DashHeader';
import NavPanel from '../Header/NavPanel';
import './calendar.css';

export default function Calendar(){
    return (

        <div>
            <DashHeader/>
            <NavPanel/>
            <div className='calendar-frame'>
                <iframe 
                    src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=oyc.official%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FNew_York" width="1200" height="800" frameborder="0" scrolling="no">
                </iframe>
            </div>
                    
        </div>


    )
    
    
}