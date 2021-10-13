import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

/*
In order to work with React in the browsers, we need to include 2 libraries: React and ReactDOM.
React library is responsible for creating views and ReactDOM library is responsible to actually render UI in the browser.

What is ReactDOM & its render method?
ReactDOM is a package that provides DOM specific methods/APIs that are used at the top level of a web app 
to enable an efficient way of managing/manipulating DOM elements of the web page.

render function is used to render a single React Component or several Components wrapped together in a Component or a div element. 
This function uses the efficient methods of React for updating the DOM by being able to change only a subtree, efficient diff methods, etc. 

Syntax:
ReactDOM.render(element, container, callback)

Parameters: This method can take a maximum of three parameters as described below.
element: This parameter expects a JSX expression or a React Element to be rendered.
container: This parameter expects the container in which the element has to be rendered.
callback: This is an optional parameter that expects a function that is to be executed once the render is complete.
*/ 
ReactDOM.render(<App />, document.getElementById('root'));

