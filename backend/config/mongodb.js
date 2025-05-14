import mongoose from "mongoose";
const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>{
        console.log("database connected")
    })
    mongoose.connect(`${process.env.MONGODB_URL}/bookdoc`)
}
export default connectDB