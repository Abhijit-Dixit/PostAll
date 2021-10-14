import {Link,withRouter} from 'react-router-dom'
import React from 'react'
import {signout,hasAuthenticated} from '../auth'

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

const isActive=(history,path)=>{
    if(history.location.pathname===path)return {color: '#ccff00'}
    else return {color: '#ffffff'}
}


const Menu=({history})=>(
            <div>
                <ul className="nav nav-tabs bg-primary">
                    <li className="nav-item">
                        <Link className='nav-link'to='/' style={isActive(history,'/')}>Home</Link>
                    </li>  
                    <li className="nav-item">
                        <Link className='nav-link'to='/users' style={isActive(history,'/users')}>Users</Link>
                    </li>  
                
                    { !hasAuthenticated() &&(
                        <>
                        <li className="nav-item">
                            <Link className='nav-link' to='/signin' style={isActive(history,'/signin')}>Sign In</Link>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to='/signup' style={isActive(history,'/signup')}>Sign Up</Link>
                        </li>
                        </>
                    )}
                    { hasAuthenticated() && (
                        <>
                        <li className="nav-item">
                            <span className='nav-link' onClick={()=>signout(()=>{history.push('/')})} style={(isActive(history,'/signout'),{cursor:'pointer'})}>Sign Out</span>
                        </li>
                        <li className="nav-item">
                            <Link className='nav-link' to={`/users/${hasAuthenticated().User._id}`} style={(isActive(history,`/users/${hasAuthenticated().User._id}`))}>{hasAuthenticated().User.name}'s Profile </Link>                          
                        </li>
                        
                        </>
                    )}
                    
                </ul>        
            </div>
        )



export default withRouter(Menu);

