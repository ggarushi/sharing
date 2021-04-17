const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const requireLogin=require('../middlewares/requireLogin');
const Post=mongoose.model('Post');
router.get('/allposts',(req,res)=>{
    Post.find().populate("postedBy","_id name").then(
        posts=>{
            res.json({posts})
        }
    )
    .catch(error=>{
        console.log(error)
    })
})
router.post('/createpost',requireLogin,(req,res)=>{
    const {title,body}=req.body
    if(!title || !body){
        console.log(req.user)
        return res.status(422).json({error:"please fill all the fields"})
    }
    //we don't need password to bes stored
    req.user.password=undefined
    const post= new Post({
        title,
        body,
        postedBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(error=>{
        console.log(error)
    })
})
router.get('/myposts',requireLogin,(req,res)=>{
    Post.find({postedBy:req.user._id}).populate("postedBy","_id name").then(mypost=>{
        res.json({mypost})
    })
    .catch(error=>{
        console.log(error)
    })
})
module.exports=router