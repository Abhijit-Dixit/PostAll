import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';
import Profile from './user/Profile';
import Users from './user/Users';
import EditProfile from './user/EditProfile';
import PrivateRoute from './auth/privateRoute';
import ReadSinglePost from './post/ReadSinglePost';
import WritePost from './post/WritePost';

// This is the file where we have implmented Client Side Routing.



const MainRouter=()=>(
        <div>
            <Menu/>
            <Switch>
                <Route exact path='/' component={Home}/>
                <Route exact path='/users' component={Users}/>
                <Route exact path='/signup' component={Signup}/>
                <Route path='/signin' component={Signin}/>
                <Route path='/post/new' component={WritePost}/>
                <Route path='/post' component={ReadSinglePost}/>
                <PrivateRoute exact path='/users/:userId'  component={Profile}/>
                <PrivateRoute exact path='/user/edit/:userId'  component={EditProfile}/>                
            </Switch>
            
        </div>
    )


export default MainRouter