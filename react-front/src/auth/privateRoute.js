import React, {Component} from "react";
import {Route, Redirect} from "react-router-dom";
import { hasAuthenticated } from ".";

/*
The private route component is similar to the public route, the only change is that redirect URL and authenticate condition. 
If the user is not authenticated he will be redirected to the login page and the user can only access the authenticated routes if he is authenticated (Logged in).

 render props are simply props of a component where you can pass functions.
 These functions need to return elements, which will be used in rendering the components.
 In our implmentation reder props is assigned a function which decides the wheter the component passed as props
 should be displayed or User should be redirected, based on whether User is authenticated or not.
*/

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