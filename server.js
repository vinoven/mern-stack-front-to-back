const express = require("express");
const connectDB = require("./config/db");
const PORT = process.env.PORT || 5000;

// start server
const app = express();

// connect DB
connectDB();

// init middleware
app.use(express.json({ extended: false }));

// define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));

app.get("/", (req, res) => res.send("API Running"));

app.listen(PORT, () => console.log(`[log] Server started on port ${PORT}`));
