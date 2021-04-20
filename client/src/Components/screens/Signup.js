import React,{useState} from 'react';
import {Link} from 'react-router-dom';
const Signup=()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const PostData=()=>{
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name:"",
                password:"",
                email:""
            })
        }).then(res=>res.json())
        .then(data=>{
            console.log(data)
        })
    }
    return (
        <div className="top-card">
        <div className="auth-card">
            <h2>Sharing</h2>
            <input className="signin_input" type="text"
            placeholder="name"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            />
            <input className="signin_input" type="text"
            placeholder="email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            />
            <input className="signin_input" type="text"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
            <button className="signin_button" onClick={()=>PostData()}>
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