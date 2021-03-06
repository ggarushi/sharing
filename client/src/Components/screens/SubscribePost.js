import React,{useState,useEffect,useContext} from 'react';
import {UserContext} from '../../App';
import {Link,useHistory} from 'react-router-dom'
import './Home.css';
const SubscribePost=()=>{
    const [data,setData]=useState([])
    const {state,dispatch}=useContext(UserContext)
    const history = useHistory()
    useEffect(()=>{
        const user=JSON.parse(localStorage.getItem("user"))
        if(!user){
          dispatch({type:"CLEAR"})
          history.push('/signin')
        }
        fetch('/subposts',{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            // console.log(result)
            setData(result.posts)
        })
    },[data])
    const likePost = (id)=>{
        fetch('/like',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
                 //   console.log(result)
          const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
            console.log(err)
        })
  }
  const unlikePost = (id)=>{
        fetch('/unlike',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            },
            body:JSON.stringify({
                postId:id
            })
        }).then(res=>res.json())
        .then(result=>{
          //   console.log(result)
          const newData = data.map(item=>{
              if(item._id==result._id){
                  return result
              }else{
                  return item
              }
          })
          setData(newData)
        }).catch(err=>{
          console.log(err)
      })
  }
  const makecomment=(text,postId)=>{
    fetch('/comment',{
        method:"put",
        headers:{
            "Content-Type":"application/json",
            "Authorization":"Bearer "+localStorage.getItem("jwt")
        },
        body:JSON.stringify(
            {
                postId,
                text
            })
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.map(item=>{
          if(item._id==result._id){
              return result
          }else{
              return item
          }
       })
       setData(newData)
          }).catch(err=>{
              console.log(err)
          })
  }
  const deletePost = (postid)=>{
    fetch(`/deletepost/${postid}`,{
        method:"delete",
        headers:{
            Authorization:"Bearer "+localStorage.getItem("jwt")
        }
    }).then(res=>res.json())
    .then(result=>{
        console.log(result)
        const newData = data.filter(item=>{
            return item._id !== result._id
        })
        setData(newData)
    })
}
    return (
        <div className="Outer-card">
           {
               data.map(item=>{
                   return(  
                <div className="inner-card" key={item._id}>
                <h5><Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  } style={{textDecoration:"none"}}>{item.postedBy.name}</Link>
                {item.postedBy._id==state._id && 
                <i className="fa fa-trash" aria-hidden="true" style={{float:"right" }} onClick={()=>deletePost(item._id)}></i>}</h5>
                <div className="card-image">
                <img className="ca-img" src={item.photo} alt="profile"/>
                </div>
                <div className="card-content">
                {item.likes.includes(state._id)
                ? <i className="fa fa-thumbs-down" style={{marginLeft:"10px"}} aria-hidden="true" onClick={()=>{unlikePost(item._id)}}></i>
                : <i className="fa fa-thumbs-up" aria-hidden="true" onClick={()=>{likePost(item._id)}}></i>}
                    <h6>{item.likes.length} likes</h6>
                    <h6>{item.title}</h6>
                    <p style={{fontSize:"1.3em"}}>{item.body}</p>
                    {
                                    item.comments.map(record=>{
                                        return(
                                        <h6 key={record._id}><span style={{fontWeight:"500"}}>{record.postedBy.name}</span> {record.text}</h6>
                                        )
                                    })
                                }
                    <form onSubmit={(e)=>{
                                    e.preventDefault()
                                    makecomment(e.target[0].value,item._id)
                                }}>
                    <input className="card-input" type="text" placeholder="add a comment"/>
                    </form>
                </div>
            </div>)
               })
           }
        </div>
        
        
    )
}
export default SubscribePost;