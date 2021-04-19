import React from 'react';
import './Home.css';
const Home=()=>{
    return (
        <div className="Outer-card">
            <div className="inner-card">
                <h5>ramesh</h5>
                <div className="card-image">
                <img className="ca-img" src="https://images.unsplash.com/photo-1618678419688-a6dd93d0aa10?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile"/>
                </div>
                <div className="card-content">
                    <h6>title</h6>
                    <p style={{fontSize:"1.3em"}}>amazing post</p>
                    <input className="card-input" type="text" placeholder="add a comment"/>
                </div>
            </div>
        </div>
        
        
    )
}
export default Home;