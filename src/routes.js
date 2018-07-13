import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Splash from './Components/Splash/Splash';
import Profile from './Components/Dashboard/Profile/Profile';
import Members from './Components/Dashboard/Members/Members';
import MemberProfile from './Components/Dashboard/Members/MemberProfile';
import Membership from './Components/Membership/Membership';
import Calendar from './Components/Dashboard/Calendar/Calendar';
import About from './Components/About/About';
import Settings from './Components/Dashboard/Settings/Settings';

export default (
  <Switch>
    <Route component={Splash} exact path='/' />
    <Route component={Membership} path='/membership' />
    <Route component={Profile} path='/profile' />
    <Route component={About} path='/about' />
    <Route component={Members} path='/members'/>
    <Route component={MemberProfile} path='/member/profile/:id'/>
    <Route component={Calendar} path='/calendar' />
    <Route component={Settings} path='/settings' />
  </Switch>
);
  