import React, { Component } from 'react';
import {hasAuthenticated} from '../auth';
import {Redirect, Link} from 'react-router-dom';
import {read} from '../user/userApi';
import image from '../images.png';
import DeleteUser from './deleteUser';

export default class Profile extends Component {
    constructor(){
        super();
        this.state={
            user:'',
            redirectToSignin:false
        }
    }
    
    init=(userId)=>{
        read(userId,hasAuthenticated().token)
        .then(data=>{
            if(data.error){
                this.setState({
                    redirectToSignin:true
                })
            }
            else{
                this.setState({
                    user:data
                })
            }    
            
        });
    }

    componentDidMount(){
        const userId=this.props.match.params.userId;
        console.log(userId);
        this.init(userId);
    } 
    componentWillReceiveProps(props){
        const userId=props.match.params.userId;// the component itself is not getting the props it is due to react router DOM.
        console.log(userId);
        this.init(userId);
    } 

    render() {
        if(this.state.redirectToSignin){
            return <Redirect to='/signin'/>;
        }
        return (
            <div className='container'>
            <h2 className='mt-5 mb-5'>Profile</h2>
                <div className='row'>
                    <div className='col-md-6'>                        
                        <img className='card-img-top' src={image} style={{width:'100%', height:'15vw', objectFit:'cover'}} alt='card'/>
                        
                    </div>
                    <div className='col-md-6'>
                        <h4>Name: {this.state.user.name}</h4>
                        <h4>E-mail: {this.state.user.email}</h4>
                        <h4>Joined: {new Date(this.state.user.created).toDateString()}</h4>
                        {
                        hasAuthenticated().User &&
                        hasAuthenticated().User._id===this.state.user._id
                        && (
                            <div className='d-inline-block mt-5'>
                                <Link className='btn btn-raised btn-success mr-5'
                                to={`/user/edit/${this.state.user._id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={this.state.user._id}/>
                            </div>
                        )}

                    </div>
                </div>
                
            </div>
            
        )
    }
}
