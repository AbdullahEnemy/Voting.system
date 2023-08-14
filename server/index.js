const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const userRouter = require("./routes/users_router");

require("dotenv").config();

const { MONGO_URL, PORT } = process.env;
const app = express();

mongoose
  .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connection established with MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB:", err);
  });

app.listen(PORT, () => {
  console.log("Server listening on port " + PORT);
});

app.use(
  cors({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());

app.use(express.json());

app.use("/users", userRouter);
/*let user1=new user({

    email:"test1@exmaple.com",
    username:"enemy1",
    password:"12345678",
    userType:"admin",
    CNIC:"1234567829",
    constituency:"greentown"
})
user1.save();*/
//  user.find().then((u)=>{
//      console.log(u)
//  })
//  .catch(()=>
//  console.log("Error:user not found")
//  )


