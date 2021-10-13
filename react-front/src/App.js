import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import MainRouter from './MainRouter';

/*
Routing is a process in which a user is directed to different pages based on their action or request.

React Router DOM package plays an important role to display multiple views in a single page application. 
This kind of client side routing makes your single page app feel more like a traditional webpage/web app.
A single-page application is a web application or website that interacts with the user by dynamically rewriting the current web page with new data from the web server,
instead of the default method of a web browser loading entire new pages.

There are two types of router components:
<BrowserRouter>: It is used for handling the dynamic URL.
  A dynamic URL is the address - or Uniform Resource Locator (URL) - of a Web page with content that depends on variable parameters that are provided to the server that delivers it.
  The parameters may be already present in the URL itself or they may be the result of user input.
<HashRouter>: It is used for handling the static request.

What is <BrowserRouter>?
<BrowserRouter> is a <Router> that uses the HTML5 history API (pushState, replaceState and the popstate event) to keep your UI in sync with the URL.

What is <Route>?
It is used to define and render component based on the specified path.

What is <Link> & <NavLink>?
Link component is used to create links which allow to navigate on different URLs and render its content without reloading the webpage.
The Link component allows navigating the different routes on the websites, whereas NavLink component is used to add styles to the active routes.

What is <Switch>?
The <Switch/> component will only render the first route that matches/includes the path.
Once it finds the first route that matches the path, it will not look for any other matches. 

*/
const App=()=>(
  <Router>
    <MainRouter/>
  </Router>

)
export default App;
