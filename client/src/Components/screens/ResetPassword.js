import React,{useState,useContext} from 'react';
import '../../App.css';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';

const Reset=()=>{
    
    const [email,setEmail]=useState("");
    const history=useHistory();
    const PostData=()=>{
        if(!/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email)){
            M.toast({html: "invalid email",classes:"#c62828 red darken-3"})
            return
        }
        
        fetch('/reset-password',{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                email
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
                <input className="signin_input" type="text"
                placeholder="email"
                value={email}
            onChange={(e)=>setEmail(e.target.value)}
                />
               
                <button className="signin_button" onClick={()=>PostData()}>
                    RESET PASSWORD
                </button>
                
            </div>
        </div>
    )
}
export default Reset;