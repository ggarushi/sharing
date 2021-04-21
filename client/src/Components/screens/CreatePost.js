import React,{useState,useEffect,useContext} from 'react';
import M from 'materialize-css'
import {useHistory} from 'react-router-dom'
import {UserContext} from '../../App';
import './createpost.css';
const CreatePost=()=>{
    const history = useHistory()
    const [title,settitle]=useState("")
    const [body,setbody]=useState("")
    const [image,setimage]=useState("")
    const [url,setUrl] = useState("")
    const {state,dispatch}=useContext(UserContext)
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
    if(!user){
      dispatch({type:"CLEAR"})
      history.push('/signin')
    }
        if(url){
         fetch("/createpost",{
             method:"post",
             headers:{
                 "Content-Type":"application/json",
                 "Authorization":"Bearer "+localStorage.getItem("jwt")
             },
             body:JSON.stringify({
                 title,
                 body,
                 picurl:url
             })
         }).then(res=>res.json())
         .then(data=>{
     
            if(data.error){
               M.toast({html: data.error,classes:"#c62828 red darken-3"})
            }
            else{
                M.toast({html:"Created post Successfully",classes:"#43a047 green darken-1"})
                history.push('/')
            }
         }).catch(err=>{
             console.log(err)
         })
     }
     },[url])
    const postDetails = ()=>{
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
    return (
        <div className="card-filed">
            <input className="create-input" type="text" placeholder="title"
            value={title}
            onChange={(e)=>settitle(e.target.value)}
            />
            <input className="create-input" type="text" placeholder="body"
            value={body}
            onChange={(e)=>setbody(e.target.value)}
            />
            <div className="file-field"> 
                    <span className="btn">Upload image</span>
                    <input className="file-bottom" type="file" onChange={(e)=>setimage(e.target.files[0])}/>
            </div>
                <div className="">
                    <input className="create-input" type="text"/>
                </div>
            <button className="btn" 
             onClick={()=>postDetails()}>
                Submit Post
            </button>
        </div>
    )
}
export default CreatePost;