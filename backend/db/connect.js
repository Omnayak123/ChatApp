import mongoose from "mongoose";
const connect=async()=>{
    try{
        await mongoose.connect("mongodb+srv://omnayak255:FGRA5WTRGw1MNhQX@chatapp.lhbivp1.mongodb.net/chat-app-db?retryWrites=true&w=majority&appName=ChatApp");
        console.log("Connected to mongo db");

    }catch(error){
        console.log(error)
    }
}
export default connect
