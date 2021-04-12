const express=require("express");
const mongoose=require("mongoose");
const {Mongourl}=require('./key');
const PORT=3000
const app=express();
app.use(express.json())
app.use(require('./routers/auth'))
mongoose.connect(Mongourl,{useNewUrlParser:true,
    useUnifiedTopology:true
})
mongoose.connection.on('connected',()=>{
    console.log("connected")
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})
app.listen(PORT,()=>{
    console.log("running")
})
require('./models/users');