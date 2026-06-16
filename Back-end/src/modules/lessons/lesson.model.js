const mongoose=require('mongoose');
const lessonSchema=new mongoose.Schema({
   ChapterId:{type:mongoose.Schema.Types.ObjectId,required:[true,"The ChapterId is required"],ref:'Chapter'},
   Title:{type:String,required:[true,"The Lesson title is required"]},
   Content:{type:String,required:[true,"The Lesson Content is required"]}, 

},{timestamps:true});
module.exports=mongoose.model('Lesson',lessonSchema);