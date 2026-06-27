const mongoose=require('mongoose');
const { hashPassword } = require('../../shared/utils/hashHelper');
const userSchema=new mongoose.Schema({
    FName:{type:String,required:[true,"First Name IS Required"]},
    LName:{type:String,required:[true,"Last Name IS Required"]},
    Email:{type:String,required:[true,'Email Is Required'],unique:[true,"This Email Already Exist"]},
    SSN:{type:String,required:[true,"The SSN is Required"],unique:[true,"THis SSN is Already Exist"]},
    Password:{type:String,required:[true,"The Password is Required"],select:false},
    Phone:{type:String,required:[true,"The Phone is Required"]},
    Avatar:{type:String},
    activeStatus:{type:Boolean},
    Role:{type:String,enum:['Student','Parent',"Teacher",'Admin'],required:[true,"THe Role is Required"]},
    RefreshToken:{type:String,default:null,select:false},
    isVerified:{type:Boolean,default:false},
    verificationToken:String,
    verificationTokenExpires:Date,
    passwordResetToken:String,
    passwordResetTokenExpires:String,
},{timestamps:true})
userSchema.pre('save',async function (){
    if(!this.isModified('Password'))
        return ;
    
    this.Password=await hashPassword(this.Password);
  
})
module.exports=mongoose.model('User',userSchema);