const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require('dotenv').config();

app.use(cors());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"),
    res.header("Access-Control-Allow-Credentials", true),
    res.header("Access-Control-Allow-Methods", "POST,GET,PUT,PATCH,DELETE"),
    res.header(
      "Access-Control-Allow-Headers",
      "Origin,X-Requested-With,Content-Type,Accept"
    ),
    next();
});

const router=require("./router/router");

app.use("/",router);


mongoose.connect(process.env.LOCAL_MONGO,
 (err) => {
    if (!err) {
      console.log('MongoDB Connection Succeeded.');
    } else {
      console.log('Error in DB connection : ' + err);
    }
  }
);

app.get('/', (req,res) =>{
    return res.json("Hi")
})

const PORT=process.env.PORT

app.listen(PORT,()=>{
console.log("Listening on ",PORT)
})