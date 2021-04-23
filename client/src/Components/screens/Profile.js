import React,{useEffect,useState,useContext} from 'react';
import {UserContext} from '../../App';
import {useHistory} from 'react-router-dom'
import './Profile.css';

const Profile=()=>{
    const [mypics,setPics]=useState([])
    const {state,dispatch}=useContext(UserContext)
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
    return (
        <div style={{maxWidth:"600px",margin:"0px auto"}}>
            <div className="Outer">
                <div>
                    <img style={{width:'160px',height:'160px',borderRadius:"80px"}} 
                    src="https://images.unsplash.com/photo-1618678419688-a6dd93d0aa10?ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxNXx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60" alt="profile"/>
                </div>
                <div>
                    <h2>{state?state.name:"loading"}</h2>
                    <h2>{state?state.email:"loading"}</h2>
                    <div className="profile-info">
                        <h4>{mypics.length} posts</h4>
                        <h4>{state?state.followers.length:"0"} followers</h4>
                        <h4>{state?state.following.length:"0"} following</h4>
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