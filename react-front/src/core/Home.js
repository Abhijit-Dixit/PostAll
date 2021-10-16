import React from 'react'
import Header from './Header.js';
import Posts from '../post/Posts.js'
import Sidebar from '../sidebar/Sidebar.js';

import './Home.css'

const Home=()=>{
    return(
        <div>
            <Header/>
            <div className="home">
            <Posts/>
            <Sidebar />
        </div>
        </div>
    );
}

export default Home;