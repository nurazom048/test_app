const express = require("express");
const mongoose = require("mongoose");
const app = express();
const loginroutes = require("./routers/signup");
const singinroute = require("./routers/login.route");

// connection to mongo 
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://azomazom:rr1234@cluster0.febfuth.mongodb.net/?retryWrites=true&w=majority",
).then(() => console.log("Mongoes connected"));


app.use(express.json());
// singing route
app.use("/auth",loginroutes);
// singing route
app.use(express.json());
app.use("/auth",singinroute);



app.listen(8080, function(){
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqserver started");
});