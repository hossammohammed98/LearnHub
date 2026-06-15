const mongoose=require('mongoose');
const parentSchema=new mongoose.Schema({
   UserId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The UserId is required"],ref:'User'},
   ChildernNumber:{type:Number,default:0},
})
module.exports=mongoose.model('Parent',teacherSchema);