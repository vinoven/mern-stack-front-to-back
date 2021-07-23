const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// start server
const app = express();

// connect DB
connectDB();

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`[log] Server started on port ${PORT}`));
