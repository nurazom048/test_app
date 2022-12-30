const express = require("express");
const mongoose = require("mongoose");
const app = express();
const auth_route = require("./routers/auth_route");
const video_route = require("./routers/video_route");
const user_route = require("./routers/account");
const post_route = require("./routers/post_route");
const comment_route = require("./routers/comment_routes");
const course_route = require("./routers/course_route");

const cookieParser = require('cookie-parser')


// connection to mongo 
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://azomazom:rr1234@cluster0.febfuth.mongodb.net/?retryWrites=true&w=majority",
).then(() => console.log("Mongoes connected"));


app.use(express.json());
app.use(cookieParser());



 //*****   routes  ******/
app.use("/auth",auth_route);  // auth route
app.use("/",video_route); 
app.use("/",user_route); // user route
app.use("/",post_route); 
app.use("/",comment_route); 
app.use("/",course_route); 





app.listen(8080, function(){
    console.log(" ************************* server started *********************************");
});