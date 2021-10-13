import React, { Component } from 'react'
import {follow} from './userApi'


export default class FollowProfileButton extends Component {
    // clickFollow=()=>{
    //     console.log(this.props);
    //     //this.props.onButtonClick(follow);
    // }
    render() {
        let cur=this.props;
        return (
            
            <div>
                {
                    this.props.following?<button 
                    className="btn btn-warning btn-raised mt-5"
                    >Unfollow</button>:
                    <button className="btn btn-success btn-raised mt-5 mr-5"
                    onClick={function(e){
                        cur.onButtonClick(follow);
                    }}>Follow</button>
                }
                
                                
            </div>
        )
    }
}
