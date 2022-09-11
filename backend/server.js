import express from "express";
import dotenv from "dotenv";
import connectDB from "./dbconnect.js";
import cors from "cors";
import { errorHandler, notFound } from "./middleware/errorMiddleware.js";
import colors from "colors";

const app = express();
app.use(express.json());
app.use(cors());

dotenv.config();
connectDB();

// Routes .....................//
import productRouter from "./routes/productRoute.js";
import userRouter from "./routes/userRoute.js";
import orderRouter from "./routes/orderRoutes.js";

//........<>.........//
app.use("/api/products", productRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

app.use("/api/config/paypal", (req, res) =>
  res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

// const PORT = process.env.PORT;

// const PORT = 5000;
app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT  ${process.env.PORT}`.yellow.bold);
});
