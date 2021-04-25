import React,{useState,useContext} from 'react';
import '../../App.css';
import {Link,useHistory,useParams} from 'react-router-dom';
import M from 'materialize-css';

const Login=()=>{
   
    const [password,setPassword]=useState("");
    const {token}=useParams()
    const history=useHistory();
    const PostData=()=>{
       
        fetch("/new-password",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                token
            })
        }).then(res=>res.json())
        .then(data=>{
            // console.log(data);
           if(data.error){
             
            //    <div className="toast_c">{ M.toast({html:data.error,classes:"#3f51b5 indigo"})}</div>
               M.toast({html:data.error,classes:"#3f51b5 indigo"})
           }
           else{
               
            M.toast({html:data.message})
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
               
                <input className="signin_input" type="password"
                placeholder="enter new password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
                />
                <button className="signin_button" onClick={()=>PostData()}>
                    Update password
                </button>
                
            </div>
        </div>
    )
}
export default Login;