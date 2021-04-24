const express=require("express");
const mongoose=require("mongoose");
const {Mongourl}=require('./config/key');
const PORT=process.env.PORT || 5000
const app=express();
app.use(express.json())
//put it above router/auth otherwise Schema won't be initialized.
require('./models/users');
require('./models/post')
app.use(require('./routers/auth'))
app.use(require('./routers/post'))
app.use(require('./routers/user'))
mongoose.connect(Mongourl,{useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
})
mongoose.connection.on('connected',()=>{
    console.log("connected")
})
mongoose.connection.on('error',(err)=>{
    console.log(err)
})
if(process.env.NODE_ENV=="production"){
    app.use(express.static('client/build'))
    const path=require('path')
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,'client','build','index.html'))
    })
}
app.listen(PORT,()=>{
    console.log("running")
})
