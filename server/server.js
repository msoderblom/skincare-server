import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import connectDB from "./config/db.js";

// gör så att man kan ha sina evironment variables i .env-filen
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app // Skapar en express server
const app = express();
const PORT = process.env.PORT || 5000;

// cors middleware
app.use(cors());

// allow us to have acces to the json data sent on our request body
// a piece of middleware
app.use(express.json()); // gör så att man kan parse:a json

// Routes
app.use("/api/users", userRoutes);

const server = app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);

  // stop the server nicely without crashing
  server.close(() => process.exit(1));
});

// mongoose.set("useFindAndModify", false);
