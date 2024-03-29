import React, { Component } from 'react';
import image from '../images.png';
import { Link } from 'react-router-dom';

export default class Users extends Component {
    constructor(){
        super();
        this.state={
            users:[]
        }
    }
    componentDidMount(){
        fetch('http://localhost:8080/users',{
            method:'GET',
            headers:{
                Accept:'application/json',
                'Content-Type':'application/json'
            }
        })
        .then(response=>{
            return response.json();
        })
        .catch(err=>console.log('error happened -> '+err)
        )
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                this.setState({
                    users:data
                })
            }
        })
    }
    renderUsers=users=>(
        <div className='row'>
            {users.map((user,i)=>(
                <div className='card col-md-4' key={i}>
                    <img 
                        src={`${process.env.REACT_APP_API_URL}/user/photo/${user._id}?${new Date().getTime()}`} 
                        //onError={i=>i.target.src=`${image}`}
                        alt={user.name}
                        style={{height:"200px", width:"auto"}}
                        className="img-thumbnail"/>
                    <div className='card-body'>
                        <h5 className='card-title'>{user.name}</h5>
                        <p className='card-text'>{user.email}</p>
                        <Link to={`/users/${user._id}`} className='btn btn-raised btn-primary'>
                            View Profile
                        </Link> 
                    </div>
                </div>
            ))}
        </div>
    )

    render() {
        return (
            <div className='container'>
                <h2 className='mt-5 mb-5'>Users</h2>
                {this.renderUsers(this.state.users)}
            
            </div>  
        )
    }
}
