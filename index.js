import express from "express";
const app = express();
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import helmet from "helmet";
import mongoose from "mongoose";
import userRouter from "./routes/users.js";
import authentificationRouter from "./routes/authentification.js";

// dotenv usage
dotenv.config();

// Database connection
mongoose
  .connect(process.env.MONGO_URL, {
    useUnifiedTopology: true,
  })
  .catch((error) => console.error(error))
  .then(console.log("Connected to MongoDB"));

//middleware
app.use(cors());
app.use(express.json()); // parses incoming requests with JSON
app.use(helmet()); // Helmet helps  secure your Express apps by setting various HTTP headers
app.use(morgan("common")); //HTTP request logger middleware for node.js

app.use("/api/auth", authentificationRouter);
app.use("/api/users", userRouter);

// listening to the port
app.listen(8800, () => {
  console.log("Backend server running !");
});
