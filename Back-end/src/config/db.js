const mongoose =require('mongoose');
const catchAsyncHandler=require('../shared/utils/catchAsyncHandler')
connectDB=catchAsync=catchAsyncHandler(async()=>{
    mongoose.connect(process.env.MONGODB);
})
module.exports={connectDB}
