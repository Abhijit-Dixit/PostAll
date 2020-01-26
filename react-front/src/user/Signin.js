import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import {authenticate,signin} from '../auth';

export default class Signin extends Component {
    constructor(){
        super();
        this.state={
            email:'',
            password:'',
            error:'',
            redirect:false,
            loading:false
        }
    }
    handleChange=name=>event=>{
        this.setState({
            [name]:event.target.value,
            error:'',
            redirect:false
        })
    }

    

    clickSubmit=e=>{
        e.preventDefault();
        this.setState({loading:true})
        const {email,password}=this.state;
        const user={
            email,
            password
        };
        signin(user).then(data=>{
            
            if(data.error){
                this.setState({error:data.error,
                loading:false});             
            }
            else{
                authenticate(data,()=>{
                    this.setState({
                        redirect:true
                    });
                })
                
            }
        })
    }

    

    render() {
        if(this.state.redirect){
            return <Redirect to='/'/>
        }
        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>Sign In</h2>
                <div className='alert alert-primary'
                    style={{display:this.state.error?"":"none"}}>
                    {this.state.error}
                </div>
                {this.state.loading?<div className='jumbotron text-centered'><h2>Loading</h2></div>:""}
                <form>
                    <div>
                        <label className='text-muted'>Email</label>
                        <input 
                        type='email' 
                        className="form-control"
                        onChange={this.handleChange('email')}
                        value={this.state.email}
                        />
                    </div>
                    <div>
                        <label className='text-muted'>Password</label>
                        <input 
                        type='password' 
                        className="form-control"
                        onChange={this.handleChange('password')}
                        value={this.state.password}
                        />
                    </div>
                    <button onClick={this.clickSubmit}>Submit</button>
                </form>
                
                
            </div>
        )
    }
}
