const mongoose=require('mongoose');
const studentSchema=new mongoose.Schema({
   UserId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The UserId is required"],ref:'User'},
   ParentId:{type:mongoose.Schema.Types.ObjectId,ref:'Parent'}
},{timestamps:true})
module.exports=mongoose.model('Student',studentSchema);