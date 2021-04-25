
const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const User=mongoose.model('User');
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require("../config/key")
const nodemailer = require('nodemailer')
const sendgridTransport = require('nodemailer-sendgrid-transport')
const crypto=require('crypto')
const requireLogin=require('../middlewares/requireLogin');
const {SENDGRID_API,EMAIL}=require('../config/key')
const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key:SENDGRID_API
    }
}))
//for get request
router.get("/protected",requireLogin,(req,res)=>{
    res.send('hello')
})
//for signup request
router.post("/signup",(req,res)=>{
    //object destructring
    const {name,email,password,pic}=req.body
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
            password:passwordhash,
            pic
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
        //matching bcrypted password
        bcrypt.compare(password,suser.password).then(matched=>{
            if(matched)
           { 
               const token=jwt.sign({_id:suser._id},JWT_KEY);
               const {_id,name,email,followers,following,pic}=suser
               res.json({token,user:{_id,name,email,followers,following,pic}})
            //    res.status(200).json({message:"Successfully joined"})
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
router.post('/reset-password',(req,res)=>{
    // res.json({message:"done"})
    crypto.randomBytes(32,(err,buffer)=>{
        if(err){
            console.log(err)
        }
        const token = buffer.toString("hex")
        User.findOne({email:req.body.email})
        .then(user=>{
            if(!user){
                return res.status(422).json({error:"User dont exists with that email"})
            }
            console.log(token);
            user.resetToken = token
            user.expireToken = Date.now() + 3600000
            user.save().then((result)=>{
                transporter.sendMail({
                    to:user.email,
                    from:"ggarushi_be18@thapar.edu",
                    subject:"password reset",
                    html:`
                    <p>You requested for password reset</p>
                    <h5>click in this <a href="${EMAIL}/reset/${token}">link</a> to reset password</h5>
                    `
                })
                res.json({message:"check your email"})
            })

        })
     })
})
router.post('/new-password',(req,res)=>{
    const newPassword = req.body.password
    const sentToken = req.body.token
    User.findOne({resetToken:sentToken,expireToken:{$gt:Date.now()}})
    .then(user=>{
        if(!user){
            return res.status(422).json({error:"Try again session expired"})
        }
        bcrypt.hash(newPassword,12).then(hashedpassword=>{
           user.password = hashedpassword
           user.resetToken = undefined
           user.expireToken = undefined
           user.save().then((saveduser)=>{
               res.json({message:"password updated success"})
           })
        })
    }).catch(err=>{
        console.log(err)
    })
})

module.exports=router