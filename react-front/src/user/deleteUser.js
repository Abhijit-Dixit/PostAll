import React, { Component } from 'react';
import {hasAuthenticated} from '../auth';
import {remove} from '../user/userApi';
import { Redirect } from 'react-router-dom';
import {signout} from '../auth/index';

/*
The easiest way to use <Redirect/> is by maintaining a redirect property inside the state of the component.
Whenever you want to redirect to another path, you can simply change the state to re-render the component, thus rendering the <Redirect> component.

*/

export default class DeleteUser extends Component {
    state={
        redirect:false
    }
    deleteAccount=()=>{
        const token=hasAuthenticated().token;
        const userId=this.props.userId;
        remove(userId,token)
        .then(data=>{
            if(data.error){
                console.log('error happened '+data.error);
            }
            else{
                signout(()=>console.log('user signed out and deleted!'));
                this.setState({
                    redirect:true
                })
                
            }
        })
    }

    deleteConfirmed=()=>{
        let ans=window.confirm("Are you sure you want to delete the profile");
        if(ans){
            this.deleteAccount();
        }
    }
    render() {
        if(this.state.redirect){
            return <Redirect to='/' />
        }
        return (
                <button onClick={this.deleteConfirmed} className='btn btn-raised btn-danger'>
                    Delete Profile
                </button>
            
        )
    }
}
