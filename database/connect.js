import mongoose from "mongoose";

const connectDB = () =>{
    mongoose
    .connect(process.env.MONGODB_URI)
      .then(() => console.log('connected to mongo'))
      .catch((err) => {
        console.error('failed to connect with mongo');
        console.error(err);
      });
}

export default connectDB;