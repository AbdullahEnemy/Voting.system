const express = require('express')
const app = express();
const mongoose= require('mongoose')
let  user=require('./models/user')
const PORT =4000;
mongoose.connect("mongodb://127.0.0.1:27017/local")
.then(()=>{
    console.log('connected')
})
.catch((err)=>{

    console.log('error')
})
app.get("/", (req,res)=>{
    res.send("Hello Enemy");
});
app.listen(PORT,()=>{
    console.log("serve started listening to app")

});
/*let user1=new user({

    email:"test1@exmaple.com",
    username:"enemy1",
    password:"12345678",
    userType:"admin",
    CNIC:"1234567829",
    constituency:"greentown"
})



user1.save();*/

user.find().then((u)=>{
    console.log(u)
})
.catch(()=>
console.log("Error:user not found")
)


