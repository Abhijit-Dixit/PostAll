const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;

const postSchema=mongoose.Schema({
    title:{
        type:String,
        required:"The title is compulsory",
        minLength:4,
        maxLength:20
    },
    body:{
        type:String,
        required:"The body cannot be empty",
        minLength:10,
        maxLength:10000,
    },
    photo:{
        data:Buffer,
        contentType:String
    },
    postedBy:{
        type:ObjectId,
        ref:"User"
    },
    created:{
        type:Date,
        default:Date.now
    }
});

module.exports=mongoose.model("Post",postSchema);
