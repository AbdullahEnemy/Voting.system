const express = require('express')
const app = express();
const mongoose= require('mongoose')
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