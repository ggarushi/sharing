const express=require('express');
const router=express.Router();

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
    res.json({message:"fullfileed"})
})
module.exports=router