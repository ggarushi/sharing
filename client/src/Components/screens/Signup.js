import React,{useState,useEffect} from 'react';
import {Link,useHistory} from 'react-router-dom';
import M from 'materialize-css';
import '../../App.css';
import './createpost.css';
const Signup=()=>{
    const [name,setName]=useState("");
    const [password,setPassword]=useState("");
    const [email,setEmail]=useState("");
   const [image,setimage]=useState("")
   const[url,setUrl]=useState(undefined)
    const history=useHistory();
    useEffect(()=>{
        if(url){
            uploadFields()
        }
    },[url])
    const uploadPic = ()=>{
        const data = new FormData()
        data.append("file",image)
        data.append("upload_preset","sharing")
        data.append("cloud_name","garushi")
         fetch("https://api.cloudinary.com/v1_1/garushi/image/upload",{
            method:"post",
            body:data
        })
        .then(res=>res.json())
        .then(data=>{
           setUrl(data.url)
        })
        .catch(err=>{
            console.log(err)
        })
    }
    const uploadFields = ()=>{
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
                email,
                pic:url
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
               M.toast({html:data.error})
           }
           else{
               M.toast({html:data.message})
               history.push('/signin');
           }
        }).catch(error=>{
            console.log(error);
        })
    }
    const PostData=()=>{
        if(image){
            uploadPic();
            // console.log(url)
        }
        else{
            uploadFields()
        }
        
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
            <input className="signin_input" type="password"
            placeholder="password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            />
             <div className="file-field"> 
                    <span className="btn">Upload image</span>
                    <input className="file-bottom" style={{marginTop:"15px"}} type="file" onChange={(e)=>setimage(e.target.files[0])}/>
            </div>
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