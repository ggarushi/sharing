import React,{useState,useContext} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../App';
import "./Navbar.css";
const Navbar=()=>{
    const {state,dispatch}=useContext(UserContext)
    const[formobile,setmobile]=useState(false);
    const renderList=()=>{
        if(state){
        return [
            <Link to="/profile" className="profile">
            <li>Profile</li>
            </Link>,
            <Link to="/createpost" className="profile">
            <li>Create Post</li>
            </Link>
        ]}
        else{
            return [
                <Link to="/signin" className="login">
                    <li>Login</li>
                </Link>,
                <Link to="/signup" className="signup">
                    <li>Signup</li>
                </Link>
            ]
        }
    }
    return(
        <nav className="navbarown">
            <Link to={state?"/":"/signin"} className="logo"><h3>Sharing</h3></Link>
            <ul className={formobile? "nav-links-mobile":"nav-links"}
            onClick={()=>setmobile(false)}>
               {renderList()}
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