const mongoose = require('mongoose')

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true
    },
    videoUrl:{
        type:String,
        required:true
    },
    pdf:String,
    quiz:String,
    topics:{
        type:[String],
        required:true
    },
    duration:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    approved:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model('course',courseSchema)