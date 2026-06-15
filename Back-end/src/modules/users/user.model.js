const mongoose=require('mongoose');
const userSchema=new mongoose.Schema({
    FName:{type:String,required:[true,"Frist Name IS Required"]},
    LName:{type:String,required:[true,"Last Name IS Required"]},
    Email:{type:String,required:[true,'Email Is Required'],uniqe:[true,"This Email Aleady Exist"]},
    SSN:{type:String,required:[true,"The SSN is Required"],unique:[true,"THis SSN is Already Exist"]},
    Password:{type:String,required:[true,"The Password is Required"]},
    ConfirmPassword:{type:String,required:[true,"The Confirm Password is Required"]},
    Phone:{type:String,required:[true,"The Phone is Required"]},
    Avatar:{type:String},
    role:{type:String,enum:['Student','Parent',"Teacher",'Admin'],required:[true,"THe Role is Required"]},
})
module.exports=mongoose.model('User',userSchema);