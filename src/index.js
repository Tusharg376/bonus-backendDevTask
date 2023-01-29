const express = require('express')
const app = express()
const mongoose = require('mongoose')
const route = require('./routes/route')
mongoose.set('strictQuery', false);
app.use(express.json())

mongoose.connect('mongodb+srv://newdatabase:Gd6tycxuRBETdhM7@ourowncluster.jzinjug.mongodb.net/bonusDevDB', { useNewUrlParser:true})
.then(()=> console.log("database connected"))
.catch((err)=> console.log(err.message))

app.use('/', route)

app.listen(3000, function(req,res){
    console.log("server is connected on post 3000")
})