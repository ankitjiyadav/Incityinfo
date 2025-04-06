const mongoose=require('mongoose');
const connectDB = async ()=>{
    try{
        await mongoose.connectDB(process.env.MONGO_URI);
        console.log("MongoDB connected");
    }catch(error){
        console.error('❌ MongoDB connection error:', err);
      }
}