import React,{useState} from 'react';
import {Link} from 'react-router-dom';
import "./Navbar.css";
const Navbar=()=>{
    const[formobile,setmobile]=useState(false);
    return(
        <nav className="navbarown">
            <Link to="/" className="logo"><h3>Sharing</h3></Link>
            <ul className={formobile? "nav-links-mobile":"nav-links"}
            onClick={()=>setmobile(false)}>
                <Link to="/signin" className="login">
                    <li>Login</li>
                </Link>
                <Link to="/signup" className="signup">
                    <li>Signup</li>
                </Link>
                <Link to="/profile" className="profile">
                    <li>Profile</li>
                </Link>
                <Link to="/createpost" className="profile">
                    <li>Create Post</li>
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
export default Navbar;