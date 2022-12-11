const express = require("express");
const mongoose = require("mongoose");
const app = express();
//
mongoose.connect("mongodb+srv://nuazomad:rr1234@cluster0.ybikdla.mongodb.net/?retryWrites=true&w=majority").then(function(){
// home houte
    app.get("/", (req, res)=> {
        res.send("This is home connected mongoes");
        
        }),
        
        // notes  route
        app.get("/notes", (req, res)=> {
            res.send("This is notes mongoes note");
            
            });
});



app.listen(8080, function(){
    console.log("qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqserver started");
});