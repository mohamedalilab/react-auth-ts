const express = require("express");
const mongoose = require("mongoose");
const { default: helmet } = require("helmet");
const cors = require("cors");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const { conCompassDB } = require("./config/connectDB");
const authRoute = require("./routes/auth.route");
const postRoute = require("./routes/post.route");

const app = express();

// 1. CORS MUST BE FIRST
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  allowedHeaders: "Content-Type,Authorization",
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // Explicitly handle preflight for all routes

// 2. Security headers
app.use(helmet()); 

// 3. Parsers
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// ________________ main route:
app.all("/", (req, res) => {
  res.send("React Auth CRUD API Server");
});

// Request logger:
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// ________________routes with /api prefix:
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);

//_________________handling errors:
app.use((err, req, res, next) => {
  console.error("Error:", err);
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal server error";
  res.status(statusCode).json({ message });
});

// ________________unknown routes:
app.use("/*", (req, res) => {
  res.status(404).json({ message: "Route not found!" });
});

// ________________connect to database & run the server:
conCompassDB(process.env.DATABASE_URI);
mongoose.connection.once("open", () => {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    console.log(`API available at http://localhost:${PORT}/api`);
  });
});
