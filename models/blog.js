const mongoose = require('mongoose');
const blogSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
        minlength:5,
        maxlength:100
    },
    body:{
        type:String,
        required:true,
    },
    status:{
        type:String,
        default:"عمومی",
        enum:["خصوصی","عمومی"]
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",


    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports= mongoose.model("Blog",blogSchema)
