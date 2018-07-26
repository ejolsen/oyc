import React from 'react';
import SplashHeader from './SplashHeader';

export default function Calendar(){
    return (
        <div>
            <SplashHeader component_title='CALENDAR'/>
            <div className='header-buffer'></div>
            <div className='splash-calendar-body'>
                <div className='splash-calendar-main-section'>
                    <iframe 
                        src="https://calendar.google.com/calendar/embed?showTitle=0&amp;showTabs=0&amp;showCalendars=0&amp;showTz=0&amp;height=600&amp;wkst=1&amp;bgcolor=%23ffffff&amp;src=oyc.official%40gmail.com&amp;color=%231B887A&amp;ctz=America%2FNew_York" width="53%" height="600" frameborder="0" scrolling="yes">
                    </iframe>
                    <div className='splash-events'></div>
                </div>
            </div>
        </div>
    )  
}