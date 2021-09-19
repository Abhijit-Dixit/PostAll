import React, { Component } from 'react'
import {signup} from '../auth'
import { Link } from 'react-router-dom';

export default class Signup extends Component {
    constructor(){
        super();
        this.state={
            name:'',
            email:'',
            password:'',
            error:'',
            op:false
        }
    }
    handleChange=name=>event=>{
        this.setState({
            [name]:event.target.value,
            error:'',
            op:false
        })
    }

    clickSubmit=e=>{
        e.preventDefault();
        const {name,email,password}=this.state;
        const user={
            name,
            email,
            password
        };
        signup(user).then(data=>{
            if(data.error){
                this.setState({error:data.error});
            }
            else{
                this.setState({
                    name:'',
                    email:'',
                    password:'',
                    error:'',
                    op:true
                })
            }
        })
    }
    signupform=(name,email,password)=>(
        <form>
            <div className='form-group'>
                <label className='text-muted'>Name</label>
                <input 
                type='text'
                className="form-control"
                onChange={this.handleChange("name")}
                value={name}
                />
            </div>
            <div>
                <label className='text-muted'>Email</label>
                <input 
                type='email' 
                className="form-control"
                onChange={this.handleChange('email')}
                value={email}
                />
            </div>
            <div>
                <label className='text-muted'>Password</label>
                <input 
                type='password' 
                className="form-control"
                onChange={this.handleChange('password')}
                value={password}
                />
            </div>
            <button onClick={this.clickSubmit}>Submit</button>
        </form>
    )

    render() {
        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>Sign Up</h2>
                <div className='alert alert-primary'
                    style={{display:this.state.error?"":"none"}}>
                    {this.state.error}
                </div>
                <div className='alert alert-info'
                    style={{display:this.state.op?"":"none"}}>
                    New account is successfully created. Please <Link to="/signin"> Sign In</Link>.
                </div>
                {this.signupform(this.state.name,this.state.email,this.state.password)}
                            
                
            </div>
        )
    }
}
