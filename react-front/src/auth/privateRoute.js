import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import { hasAuthenticated } from ".";

const PrivateRoute = ({component:Component, ...rest}) => (

    <Route
        {...rest}
        render = {props =>
            hasAuthenticated()? (
                <Component {...props}/>
            ) :(
                <Redirect 
                    to={{pathname:"/signin",
                        state: { from: props.location}}}
                />
            )
        }
    />

);

export default PrivateRoute;