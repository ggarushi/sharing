const express=require("express");
const mongoose=require("mongoose");
const {Mongourl}=require('./key');
const PORT=3000
const app=express();
app.use(express.json())
//put it above router/auth otherwise Schema won't be initialized.
require('./models/users');
require('./models/post')
app.use(require('./routers/auth'))
app.use(require('./routers/post'))
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
