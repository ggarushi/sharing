import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";
const Navbar=()=>{
    const[formobile,setmobile]=useState(false);
    return(
        <nav className="navbar">
            <h3 className="logo">LOGO</h3>
            <ul className={formobile? "nav-links-mobile":"nav-links"}
            onClick={()=>setmobile(false)}>
                <Link to="/" className="login">
                    <li>Login</li>
                </Link>
                <Link to="/" className="signup">
                    <li>Signup</li>
                </Link>
                <Link to="/" className="profile">
                    <li>Profile</li>
                </Link>
            </ul>
            <button className="mobile-menu"
            onClick={()=>setmobile(!formobile)}>
                {formobile? <i className="fas fa-times"></i>:
                <i className="fas fa-bars"></i>}
            </button>
        </nav>
    )
}