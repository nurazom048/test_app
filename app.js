const express = require("express");
const app = express();

// home houte
app.get("/", (req, res)=> {
res.send("This is home");

}),

// notes  route
app.get("/notes", (req, res)=> {
    res.send("This is notesf");
    
    }),
app.listen(5000);