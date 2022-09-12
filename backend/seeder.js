import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./dbconnect.js";
import Order from "./models/OrderModel.js";
import User from "./models/UserModel.js";
import Product from "./models/proshopModel.js";
import products from "./data/product.js";
import users from "./data/user.js";
dotenv.config();
connectDB();

const importData = async () => {
  try {
    const createUsers = await User.insertMany(users);
    const adminUser = createUsers[0]._id;
    const sampleData = products.map((products) => ({
      ...products,
      user: adminUser,
    }));

    await Product.insertMany(sampleData);
    console.log("Data imported Sucessfully");
    process.exit();
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

const deleteData = async () => {
  await Product.deleteMany();
  await Order.deleteMany();
  await User.deleteMany();

  console.log("Data Deleted Sucessfully");
  process.exit();
};

if (process.argv[2] === "-d") {
  deleteData();
} else {
  importData();
}
