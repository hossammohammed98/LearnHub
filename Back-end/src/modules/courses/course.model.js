const mongoose=require('mongoose');
const courseSchema=new mongoose.Schema({
   TeacherId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The TeacherId is required"],ref:'Teacher'},
   Title:{type:String,required:[true,"The course title is requird"]},
   Description:{type:String,required:[true,"The course Description is requird"]}, 

})
module.exports=mongoose.model('Course',courseSchema);