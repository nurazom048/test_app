const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth_route = require("./routers/auth_route");
const update_route = require("./routers/update_route");
var cookieParser = require('cookie-parser')


// connection to mongo 
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://azomazom:rr1234@cluster0.febfuth.mongodb.net/?retryWrites=true&w=majority",
).then(() => console.log("Mongoes connected"));


app.use(express.json());
app.use(cookieParser());
app.use(express.json());


 //*****   routes  ******/
app.use("/",update_route); // update route
app.use("/auth",auth_route);  // auth route







app.listen(8080, function(){
    console.log(" ************************* server started *********************************");
});