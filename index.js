// server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend URL
    methods: ["GET", "POST"]
  }
});
app.use(express.json());
io.on("connection", (socket) => {
  console.log("New client connected");

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
app.set("io", io);


// Middlewares
app.use(cors());
app.use(express.json());

// DB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("MongoDB Connected ✅"))
.catch(err => console.error("MongoDB Error ❌", err));

// Routes
app.use('/api/auth', require('./routes/authRouter'));
app.use('/api/packages', require('./routes/packageRouter')); 
app.use('/api/bookings', require('./routes/bookingRouter'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
