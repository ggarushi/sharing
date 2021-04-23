import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App';
import {useHistory} from 'react-router-dom'
import './Profile.css';

const Profile=()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const [image,setimage]=useState("")
   const[url,setUrl]=useState("")
    const history = useHistory()
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        if(!user){
          dispatch({type:"CLEAR"})
          history.push('/signin')
        }
        fetch('/myposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            setPics(result.mypost)
        })

    },[])
    useEffect(()=>{
        if(image){
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
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                    //window.location.reload()
                })
            })
            .catch(err=>{
                console.log(err)
            })
        }
    },[image])
    const UpdatePhoto=(file)=>{
        setimage(file)
      
    }
    return (
        <div style={{maxWidth:"600px",margin:"0px auto"}}>
            <div className="Outer">
                <div>
                    <img style={{width:'160px',height:'160px',borderRadius:"80px"}} 
                    src={state?state.pic:"loading"} alt="profile"/>
                     
                </div>
                <div>
                    <h2>{state?state.name:"loading"}</h2>
                    <h2>{state?state.email:"loading"}</h2>
                    <div className="profile-info">
                        <h4>{mypics.length} posts</h4>
                        <h4>{state.followers?state.followers.length:"0"} followers</h4>
                        <h4>{state.following?state.following.length:"0"} following</h4>
                    </div>
                    <div className="file-field"> 
                    <span className="btn">UPDATE PIC</span>
                    <input className="file-bottom" style={{marginTop:"10px"}} type="file" onChange={(e)=>UpdatePhoto(e.target.files[0])} />
            </div>
                </div>
            </div>
        <div className="gallery">
           { 
           mypics.map(item=>{
           return (
           <img key={item._id} className="item" src={item.photo}
            alt={item.title}/>)})
           }
            
        </div>
        </div>
    )
}
export default Profile;