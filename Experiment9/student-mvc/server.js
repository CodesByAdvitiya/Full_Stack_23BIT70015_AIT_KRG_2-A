const express = require("express");
const app = express();
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");

connectDB(); // connect to MongoDB

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => res.redirect("/students"));
app.use("/students", studentRoutes);

app.listen(3000, () =>
  console.log("🚀 Server running on http://localhost:3000")
);
