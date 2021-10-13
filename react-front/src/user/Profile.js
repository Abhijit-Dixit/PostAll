import React, { Component } from 'react';
import {hasAuthenticated} from '../auth';
import {Redirect, Link} from 'react-router-dom';
import {read} from '../user/userApi';
import image from '../images.png';
import DeleteUser from './deleteUser';
import FollowProfileButton from './FollowProfileButton';
//import user from '../../../nodeapi/models/user';

class Profile extends Component {
    
    state={
        user: '',
        redirectToSignin:false,
        following:false,
        error:''
    }
    
    checkFollow=(user)=>{
        const jwt=hasAuthenticated();
        console.log("jwt",jwt);
        const match=user.followers.find(follower=>{
            if(follower)return follower._id===jwt.User._id;
        })
        if(match)return match;
        return false;
    }

    init=(userId)=>{
        read(userId,hasAuthenticated().token)
        .then(data=>{
            let following = this.checkFollow(data);
            console.log("following ");
            console.log(following);
            if(data.error){
                this.setState({
                    redirectToSignin:true
                })
            }
            else{
                this.setState({
                    user:data,
                    following:following
                })
            }    
            
        });
    }

    

    clickFollow = callApi => {
        
        const userId=hasAuthenticated().User._id;
        const token=hasAuthenticated().token;
        console.log(token);

        callApi(userId,token,this.state.user._id)
        .then(data=>{
            console.log(data);            
        })
        .catch(err=>{
            console.log(err);
        })       

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

        const photoUrl = this.state.user._id ? `${process.env.REACT_APP_API_URL}/user/photo/${this.state.user._id}?${new Date().getTime()}`: image;
        return (
            <div className='container'>
            <h2 className='mt-5 mb-5'>Profile</h2>
                <div className='row'>
                    <div className='col-md-6'>                        
                    <img src={photoUrl} 
                        alt={this.state.user.name}
                        style={{height:"200px", width:"auto"}}
                        className="img-thumbnail"/>
                        
                    </div>
                    <div className='col-md-6'>
                        <h4>Name: {this.state.user.name}</h4>
                        <h4>E-mail: {this.state.user.email}</h4>
                        <h4>Joined: {new Date(this.state.user.created).toDateString()}</h4>
                        {
                        hasAuthenticated().User &&
                        hasAuthenticated().User._id===this.state.user._id
                        ? (
                            <div className='d-inline-block mt-5'>
                                <Link className='btn btn-raised btn-success mr-5'
                                to={`/user/edit/${this.state.user._id}`}>
                                    Edit Profile
                                </Link>
                                <DeleteUser userId={this.state.user._id}/>
                            </div>
                        ):
                        <FollowProfileButton following={this.state.following}
                                            onButtonClick={this.clickFollow}/>}

                    </div>
                </div>
                <div className="row">
                    <div className="col md-12 mt-5 mb-5">
                        <hr/>
                        <p className="lead">{this.state.user.about}</p>
                        <hr/>
                    </div>
                </div>
                
            </div>
            
        )
    }
}

export default Profile;
