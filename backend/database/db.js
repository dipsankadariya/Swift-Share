import mongoose from "mongoose";
const DBconnection =async ()=>{
    try{
    await mongoose.connect(process.env.MONGODB_URI);
     console.log('Database connected successfully');
    }
    catch(error){
        console.log('Error while connecting with the database',error.message);
    }
}

export default DBconnection;