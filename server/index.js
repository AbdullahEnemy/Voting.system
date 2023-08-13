const express = require('express')
const app = express();
app.get("/", (req,res)=>{
    res.send("Hello Enemy");
});
app.listen(4000,()=>{
    console.log("serve started listening to app")

});