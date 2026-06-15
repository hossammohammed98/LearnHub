const mongoose=require('mongoose');
const enrollmentSchema=new mongoose.Schema({
   StudentId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The UserId is required"],ref:'Student'},
   CourseId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The CourseId is required"],ref:'Course'},
   Progress:{type:Number,default:0},
})
module.exports=mongoose.model('Enrollment',enrollmentSchema);