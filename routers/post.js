const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const requireLogin=require('../middlewares/requireLogin');
const Post=mongoose.model('Post');
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
        postBy:req.user
    })
    post.save().then(result=>{
        res.json({post:result})
    })
    .catch(error=>{
        console.log(error)
    })
})
module.exports=router