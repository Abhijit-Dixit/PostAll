import React from 'react';
import {Switch,Route} from 'react-router-dom';
import Home from './core/Home';
import Signup from './user/Signup';
import Signin from './user/Signin';
import Menu from './core/Menu';


const MainRouter=()=>(
        <div>
            <Menu/>
            <Switch>
                <Route path='/' exact component={Home}/>
                <Route path='/signup' exact component={Signup}/>
                <Route Path='signin' exact component={Signin}/>
            </Switch>
            
        </div>
    )


export default MainRouter