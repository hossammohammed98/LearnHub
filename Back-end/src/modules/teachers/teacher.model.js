const mongoose=require('mongoose');
const teacherSchema=new mongoose.Schema({
   UserId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The UserId is required"],ref:'User'},
},{timestamps:true})
module.exports=mongoose.model('Teacher',teacherSchema);