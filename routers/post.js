const express=require('express')
const router=express.Router();
const mongoose=require('mongoose')
const requireLogin=require('../middlewares/requireLogin');
const Post=mongoose.model('Post');
router.get('/allposts',requireLogin,(req,res)=>{
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
    const {title,body,picurl}=req.body
    if(!title || !body||!picurl){
        console.log(req.user)
        return res.status(422).json({error:"please fill all the fields"})
    }
    //we don't need password to bes stored
    req.user.password=undefined
    const post= new Post({
        title,
        body,
        photo:picurl,
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
router.put('/like',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/unlike',requireLogin,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        $pull:{likes:req.user._id}
    },{
        new:true
    }).exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})
router.put('/comment',requireLogin,(req,res)=>{
    const comment={
        text=req.body.text,
        postedBy:req.user._id
    }
    Post.findByIdAndUpdate(req.body.postId,{
        $push:{comments:comment}
    },{
        new:true
    })
    .populate("comments.postedBy","_id name").exec((err,result)=>{
        if(err){
            return res.status(422).json({error:err})
        }else{
            res.json(result)
        }
    })
})

module.exports=router