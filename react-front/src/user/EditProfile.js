import React, { Component } from 'react'
import {hasAuthenticated} from '../auth';
import {read,update,localUpdate} from './userApi';
import { Redirect } from 'react-router-dom';
import image from '../images.png';


export default class EditProfile extends Component {
    state={
            name:'',
            email:'',
            id:'',
            password:'',
            redirectToProfile:false,
            error:'',
            about:''
        }
    
    
    init=(userId)=>{
        read(userId,hasAuthenticated().token)
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    name:data.name,
                    id:data._id,
                    email:data.email,
                    error:'',
                    about: data.about

                })
            }    
            
        });
    }

    componentDidMount(){
        this.userData=new FormData();
        const userId=this.props.match.params.userId;
        console.log(userId);
        this.init(userId);
    }

    isValid = () => {
        const {name,email,password}=this.state
        if(name.length===0){
            this.setState({error:"Name is required"})
            return false
        }

        if(!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)){
            this.setState({error:"Valid Email required"})
            return false
        }

        if(password.length()>=1 &&  password.length() <=5){
            this.setState({error:"Password must be atleast 6 chars long"})
            return false
        }

        return true;

    }

    handleChange=name=>event=>{
        const value=name==='photo'?event.target.files[0]:event.target.value;
        this.userData.set(name,value);
        this.setState({[name]:value})
        console.log(name);
    }

    clickSubmit=e=>{
        e.preventDefault();

        //enclose below code under isValid 
        //const {name,email,password}=this.state;
        // const user={
        //     name,
        //     email, 
        //     password:password||undefined,
        // }; 
        const userId=this.props.match.params.userId;
        update(userId,hasAuthenticated().token,this.userData)
        .then(data=>{
            if(data.error){
                this.setState({
                    error:data.error
                })
            }
            else{
                localUpdate(data,()=>{
                    this.setState({
                        redirectToProfile:true
                    });
                });                
            }
        })
        
    }
    signupform=(name,email,about,password)=>(
        <form onSubmit={this.clickSubmit}>
            <div className='form-group'>
                <label className='text-muted'>Profile Photo</label>
                <input 
                type='file'
                accept='image/*'
                className="form-control"
                onChange={this.handleChange("photo")}    
                />
            </div>
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
            <div className='form-group'>
                <label className='text-muted'>About</label>
                <textarea 
                type='text'
                className="form-control"
                onChange={this.handleChange("about")}
                value={about}
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
            <button type='submit'>Update</button>
        </form>
    ) 
    render() {
        if(this.state.redirectToProfile){
            return(
                <Redirect to={`/users/${this.state.id}`}/>
            )
        }

        const photoUrl = this.state.id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.id}?${new Date().getTime()}`: image;

        return (
            <div className='container'>
            <h2 className='mt-5 mb-5'>Edit Profile</h2>
            <div className="alert alert-danger"
                 style={{display: this.state.error ? "": "none"}}>
                {this.state.error}
            </div>
            <img src={photoUrl} 
                 alt={this.state.name}
                 style={{height:"200px", width:"auto"}}
                 className="img-thumbnail"/>
            {this.signupform(this.state.name,this.state.email,this.state.about,this.state.password)}

            </div>
        )
    }
}
