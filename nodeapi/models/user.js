const mongoose=require('mongoose');
const uuidv1=require('uuid/v1');
const crypto=require('crypto');
const {ObjectId}=mongoose.Schema;

const userSchema=mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        trim:true,
        required:true
    },
    hashed_password:{
        type:String,
        required:true,
    },
    salt:{
        type:String,
        default:uuidv1()
    },
    created:{
        type:Date,
        default:Date.now
    },
    updated:Date,
    photo:{
        data:Buffer,
        contentType:String
    },
    about:{
        type:String,
        trim:true
    },
    followers :[{type:ObjectId,ref:"User"}],
    following :[{type:ObjectId,ref:"User"}]
});

   

userSchema.virtual('password')
.set(function(password){
    this._password=password;
    this.hashed_password=this.encryptPassword(password);
})
.get(function(){return this._password});

userSchema.methods.encryptPassword=function(password){
    try{
        return crypto.createHmac('sha1',this.salt).update(password).digest('hex');
    }
    catch(err){
        return "";
    }
}

userSchema.methods.authenticate=function(plaintext){
    return this.hashed_password===this.encryptPassword(plaintext);
}

module.exports=mongoose.model("User",userSchema); 