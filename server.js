import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/users.js";
import forumRoutes from "./routes/forum.js";
import blogRoutes from "./routes/blog.js";
import skinfluencerRoutes from "./routes/skinfluencers.js";
import kBeautyRoutes from "./routes/kBeauty.js";
import connectDB from "./config/db.js";
import errorHandler from "./middleware/error.js";
import { Server } from "socket.io";
import path, { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// gör så att man kan ha sina evironment variables i .env-filen
dotenv.config();

// Connect to MongoDB
connectDB();

// Initialize app // Skapar en express server
const app = express();

// cors allows us to send requests across domains
app.use(cors());

// allow us to have acces to the json data sent on our request body
// a piece of middleware
app.use(express.json()); // gör så att man kan parse:a json

// Routes
app.use("/api/users", userRoutes);
app.use("/api/forum", forumRoutes);
app.use("/api/blog", blogRoutes);
app.use("/api/skinfluencers", skinfluencerRoutes);
app.use("/api/k-beauty", kBeautyRoutes);

app.use("/resources", express.static(path.join(__dirname, "/images")));

if (process.env.NODE_ENV === "production") {
  app.use("/admin-panel", express.static(path.join(__dirname, "/admin/build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "admin", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API running");
  });
}

// Error Handler
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port: ${PORT}`)
);

const io = new Server(server, {
  cors: { origin: "http://localhost:3000", credentials: true },
});

io.on("connection", (socket) => {
  socket.on("join-comments-section", (threadID, callback) => {
    console.log("User joined comment section", threadID);
    socket.join(threadID);
  });

  socket.on("new-comment", ({ comment, threadID }, callback) => {
    console.log("in new comment");
    // the server emitting an event to the client
    io.in(threadID).emit("new-comment", comment);
  });
});

process.on("unhandledRejection", (err, promise) => {
  console.log(`Logged Error: ${err}`);

  // stop the server nicely without crashing
  server.close(() => process.exit(1));
});
