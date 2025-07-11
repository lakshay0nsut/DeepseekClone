import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.route.js";
import promtRoutes from "./routes/promt.route.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4001;
const MONGO_URL = process.env.MONGO_URI;

// middleware
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  origin: 'http://localhost:5173', // No trailing slash!
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// DB Connection Code Goes Here!!!!
mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB Connection Error: ", error));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/deepseekai", promtRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// require('dotenv').config();
// const express = require('express');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 4002;

// // Middleware
// app.use(cors({
//   origin: process.env.FRONTEND_URL || 'http://localhost:5173',
//   credentials: true
// }));
// app.use(express.json());

// // Test Route
// app.get('/api/health', (req, res) => {
//   res.json({ status: 'OK', message: 'Backend connected!' });
// });

// // Signup Route (Simplified)
// app.post('/api/signup', (req, res) => {
//   const { email } = req.body;
//   if (!email) {
//     return res.status(400).json({ errors: ['Email is required'] });
//   }
//   res.status(201).json({ message: 'Signup successful!' });
// });

// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });