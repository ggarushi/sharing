const e = require('express');
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
const bcrypt=require('bcryptjs');
//for get request
router.get('/',(req,res)=>{
    res.send('hello')
})
//for signup request
router.post("/signup",(req,res)=>{
    //object destructring
    const {name,email,password}=req.body
    if(!email || !password ||!name)
    {
        return res.status(422).json({error:"please fill all the fields"})
    }
   User.findOne({email:email}).then((suser)=>{
       if(suser)
       {
           return res.status(422).json({error:"email already exist"})
       }
       //password hashing using bcrypt
       bcrypt.hash(password,12).then((passwordhash)=>{
        const user =new User({
            name,
           email,
            password:passwordhash
        })
        user.save().then((user)=>{
            return res.status(200).json({message:"Succefullly added"})
       })
       .catch((err)=>{
           console.log(error)
       })
       })
       
      
   })
   .catch((error)=>{
       console.log(error)
   })
})
router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email || !password)
    {
        return res.status(422).json({error:"please fill all the fields"})
    }
    User.findOne({email:email}).then((suser)=>{
        if(!suser)
        {
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        bcrypt.compare(password,suser.password).then(matched=>{
            if(matched)
           { 
               res.status(200).json({message:"Successfully joined"})
        }
        else{
            return res.status(422).json({error:"Invalid Email or Password"})
        }
        })
        .catch(error=>{
            console.log(error)
        })
    })

})
module.exports=router