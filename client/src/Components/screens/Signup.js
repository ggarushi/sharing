import React from 'react';
import {Link} from 'react-router-dom';
const Signup=()=>{
    return (
        <div className="top-card">
        <div className="auth-card">
            <h2>Sharing</h2>
            <input className="signin_input" type="text"
            placeholder="name"
            />
            <input className="signin_input" type="text"
            placeholder="email"
            />
            <input className="signin_input" type="text"
            placeholder="password"
            />
            <button className="signin_button">
                SignUP
            </button>
            <h5 className="bottom">
                    <Link to="signin" style={{textDecoration:"none",color:"black"}}>Already have an account?</Link>
                </h5>
        </div>
    </div>
    );
}
export default Signup;