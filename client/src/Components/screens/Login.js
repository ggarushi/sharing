import React from 'react';
import '../../App.css';
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
            </div>
        </div>
    )
}
export default Login;