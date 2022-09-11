import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

async function connectDB() {
  try {
    let result = await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to mongodb".blue.underline.bold);
  } catch (error) {
    console.log(`${error.message}`.red.underline.bold);
  }
}

export default connectDB;
