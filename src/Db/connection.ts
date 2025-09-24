import mongoose from "mongoose";


const connectDB=async()=>{
    try{
        const conn=await mongoose.connect(process.env.MONGO_URI as string,{
            serverSelectionTimeoutMS:10000,
        });
        console.log(`MongoDB connected:${conn.connection.host}`);
    }catch(error){
        console.error(`MongoDB connection error:${(error as Error).message}`);
    }


}
export default connectDB;