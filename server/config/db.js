import mongoose from "mongoose"

const dbConnect = async (req,res)=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log('db connected');
    } catch (error) {
        console.log('error in connect db ',error);
    }

}

export default dbConnect