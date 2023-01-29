const mongoose = require('mongoose')

const userSchema = new mongoose.schema({
    name:{
        type:String,
        required:true
    },
    Email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["Employee","Admin","Super Admin"],
        default:"Employee"
    }
},{timestamps:true})

module.exports = mongoose.model('user', userSchema)