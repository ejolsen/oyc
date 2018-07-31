import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Splash from './Components/Splash/Splash';
import Profile from './Components/Dashboard/Profile/Profile';
import Members from './Components/Dashboard/Members/Members';
import MemberProfile from './Components/Dashboard/Members/MemberProfile';
import Membership from './Components/Membership/Membership';
import Calendar from './Components/Dashboard/Calendar/Calendar';
import Settings from './Components/Dashboard/Settings/Settings';
import Events from './Components/Splash/Events';
import About from './Components/Splash/About';
import Admin from './Components/Admin/Admin';

export default (
  <Switch>
    <Route component={Splash} exact path='/' />
    <Route component={About} path='/about' />
    <Route component={Membership} path='/membership' />
    <Route component={Events} path='/events' />
    <Route component={Profile} path='/profile' />
    <Route component={Members} path='/members'/>
    <Route component={MemberProfile} path='/member/profile/:id'/>
    <Route component={Calendar} path='/calendar' />
    <Route component={Settings} path='/settings' />
    <Route component={Admin} path='/admin' />
  </Switch>
);
  