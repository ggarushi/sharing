import React,{useState} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import '../../App.css';
const Signup=()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
    const history=useHistory();
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
               M.toast({html:data.error,classes:"#3f51b5 indigo"})
           }
           else{
               M.toast({html:data.message,classes:"#43a047 green darken-1"})
               history.push('/signin');
           }
        }).catch(error=>{
            console.log(error);
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