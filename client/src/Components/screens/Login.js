import React from 'react';
import '../../App.css';
import {Link} from 'react-router-dom';
const Login=()=>{
    return (
        <div className="top-card">
            <div className="auth-card">
                <h2>Sharing</h2>
                <input className="signin_input" type="text"
                placeholder="email"
                />
                <input className="signin_input" type="text"
                placeholder="password"
                />
                <button className="signin_button">
                    SignIn
                </button>
                <h5 className="bottom">
                    <Link to="/signup" style={{textDecoration:"none",color:"black"}}>Don't have an account?</Link>
                </h5>
            </div>
        </div>
    )
}
export default Login;