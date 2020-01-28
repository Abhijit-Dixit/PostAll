import {Link,withRouter} from 'react-router-dom'
import React from 'react'
import {signout,hasAuthenticated} from '../auth'

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

