const express = require("express");
const api = require('./routes/apiCtrl')
const app = express()
const bodyParser = require('body-parser');
const cors = require("cors");


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(cors())
app.use("/api",api);

app.listen(3000 , ()=>{
    console.log("Server Start PORT 3000");
    
})
