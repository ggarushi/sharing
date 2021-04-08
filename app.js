const express=require("express");
const mongoose=require("mongoose");
const {Mongourl}=require('./key');
const PORT=3000
const app=express()
mongoose.connect(Mongourl,{useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected")
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})