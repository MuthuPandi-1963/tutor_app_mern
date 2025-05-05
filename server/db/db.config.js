import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const DBConfig = async()=>{
    try{
        const response = await mongoose.connect(process.env.MONGODB_URI)
        console.log("Database Connected Successfully");
    }catch(err){
        console.log(err);
        process.exit(0)
    }
    
}
export default DBConfig;