import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App';
import {useHistory} from 'react-router-dom'
import './Home.css';
const Home=()=>{
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const history = useHistory()
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        if(!user){
          dispatch({type:"CLEAR"})
          history.push('/signin')
        }
        fetch('/allposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setData(result.posts)
        })
    },[])
    return (
        <div className="Outer-card">
           {
               data.map(item=>{
                   return(  
                <div className="inner-card">
                <h5>{item.postedBy.name}</h5>
                <div className="card-image">
                <img className="ca-img" src={item.photo} alt="profile"/>
                </div>
                <div className="card-content">
                <i className="fa fa-thumbs-up" aria-hidden="true"></i>
                    <h6>{item.title}</h6>
                    <p style={{fontSize:"1.3em"}}>{item.body}</p>
                    <input className="card-input" type="text" placeholder="add a comment"/>
                </div>
            </div>)
               })
           }
        </div>
        
        
    )
}
export default Home;