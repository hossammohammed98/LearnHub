const mongoose=require('mongoose');
const parentSchema=new mongoose.Schema({
   UserId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The UserId is required"],ref:'User'},
   ChildrenNumber:{type:Number,default:0},
},{timestamps:true})
module.exports=mongoose.model('Parent',parentSchema);