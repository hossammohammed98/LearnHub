const mongoose=require('mongoose');
const assistantSchema=new mongoose.Schema({
   TeacherId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The TeacherId is required"],ref:'Teacher'},
   Email:{type:String,required:[true,"The email is requird"],unique:[true,"THis Email Already Used Before"]},
   Password:{type:String,required:[true,"The Password is requird"]}, 
   PermissionIds:{type:[String],default:[]},
},{timestamps:true})
module.exports=mongoose.model('Assistant',assistantSchema);
