import { Link, withRouter } from "react-router-dom";
import React from "react";
import { signout, hasAuthenticated } from "../auth";

import "./Menu.css";

/*
what is withRouter?
withRouter is a higher order component that will pass closest route's match, current location, and history props to the wrapped component whenever it renders. 
Simply it connects component to the router. Not all components, especially the shared components, will have the access to such router's props.
Inside its wrapped components, you would be able to access location prop and get more information like location.pathname or redirect the user to different url using this.props.history.push. 

React Router provides us with a history object, which is accessible by passing this object into each route as a prop.
This history object lets us manually control the history of the browser.

Here the purpose of isActive function is to decide the color of current active link.
history.location.pathname returns the current route. In modern react this is done with the help of useLocation hook.
*/

const isActive = (history, path) => {
  if (history.location.pathname === path) return { "marginRight": "20px",
                                                    "fontSize": "18px",
                                                    "fontWeight": "300",
                                                    "cursor": "pointer",
                                                    "color":"#444"};
  else return { "marginRight": "20px",
                "fontSize": "18px",
                "fontWeight": "300",
                "cursor": "pointer",
                "color":"#666" };
};

const Menu = ({ history }) => (
  <div className="top">
    <div className="topLeft">
        <i className="topIcon fab fa-github-square"></i>
        <i className="topIcon fab fa-facebook-square"></i>
        <i className="topIcon fab fa-instagram-square"></i>
        <i className="topIcon fab fa-pinterest-square"></i>
        <i className="topIcon fab fa-twitter-square"></i>
    </div>
    <div className="topCenter">
      <ul className="topList">
        <li className="topListItem">
          <Link to="/" style={isActive(history, "/")}>
            HOME
          </Link>
        </li>
        <li className="topListItem">
          <Link to="/users" style={isActive(history, "/users")}>
            USERS
          </Link>
        </li>
        <li className="topListItem">POSTS</li>
      </ul>
    </div>
    <div className="topRight">
      <ul className="topList">
        {!hasAuthenticated() && (
          <>
            <li className="topListItem">
              <Link to="/signin" style={isActive(history, "/signin")}>
                SIGN IN
              </Link>
            </li>
            <li className="topListItem">
              <Link to="/signup" style={isActive(history, "/signup")}>
                SIGN UP
              </Link>
            </li>
          </>
        )}
        {hasAuthenticated() && (
          <>
          <li className="topListItem">
              <Link
                to={`/users/${hasAuthenticated().User._id}`}
                style={isActive(
                  history,
                  `/users/${hasAuthenticated().User._id}`
                )}
              >
                {hasAuthenticated().User.name}'s Profile{" "}
              </Link>
            </li>   
            <li className="topListItem">
              <span
                onClick={() =>
                  signout(() => {
                    history.push("/");
                  })
                }
                style={(isActive(history, "/signout"), { cursor: "pointer" })}
              >
                SIGNOUT
              </span>
            </li>
            
          </>
        )}
      </ul>
    </div>
  </div>
);

export default withRouter(Menu);
