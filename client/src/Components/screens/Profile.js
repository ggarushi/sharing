import React from 'react';
import './Profile.css';
const Profile=()=>{
    return (
        <div style={{maxWidth:"600px",margin:"0px auto"}}>
            <div className="Outer">
                <div>
                    <img style={{width:'160px',height:'160px',borderRadius:"80px"}} 
                    src="https://images.unsplash.com/photo-1618678419688-a6dd93d0aa10?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile"/>
                </div>
                <div>
                    <h2>Ramesh verma</h2>
                    <div className="profile-info">
                        <h4>post</h4>
                        <h4>followers</h4>
                        <h4>following</h4>
                    </div>
                </div>
            </div>
        <div className="gallery">
            <img className="item" src="https://images.unsplash.com/photo-1618678419688-a6dd93d0aa10?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile"/>
            <img className="item" src="https://images.unsplash.com/photo-1618678419688-a6dd93d0aa10?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile"/>
            <img className="item" src="https://images.unsplash.com/photo-1618678419688-a6dd93d0aa10?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile"/>
        </div>
        </div>
    )
}
export default Profile;