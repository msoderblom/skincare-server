import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";

// gör så att man kan ha sina evironment variables i .env-filen
dotenv.config();

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

const uri = process.env.MONGO_URI; // database uri from mongodb atlas dashboard

// startar kopplingen till db med hjälp av uri
mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() =>
    app.listen(PORT, () =>
      console.log(`Server running on port: ${PORT} and connected to MongoDB`)
    )
  )
  .catch((error) => console.error(error.message));

mongoose.set("useFindAndModify", false);
