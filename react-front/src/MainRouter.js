import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';
import Profile from './user/Profile';
import Users from './user/Users';


const MainRouter=()=>(
        <div>
            <Menu/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/users' component={Users}/>
                <Route  path='/signup' component={Signup}/>
                <Route  path='/signin' component={Signin}/>
                <Route  path='/users/:userId'  component={Profile}/>
                
            </Switch>
            
        </div>
    )


export default MainRouter