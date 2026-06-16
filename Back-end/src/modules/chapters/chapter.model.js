const mongoose=require('mongoose');
const chapterSchema=new mongoose.Schema({
   CourseId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The CourseId is required"],ref:'Course'},
   Title:{type:String,required:[true,"The chapter title is requird"]},

},{timestamps:true})
module.exports=mongoose.model('Chapter',chapterSchema);