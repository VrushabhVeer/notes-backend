const express = require("express");
const cors = require("cors");
const { connection } = require("./Config/db");
const { userRouter } = require("./Routes/User.route");
const { notesRouter } = require("./Routes/Notes.route");
const { authentication } = require("./Middleware/authentication");
require("dotenv").config();

const port = process.env.PORT;

const app = express();
app.use(express.json()); 
app.use(cors());

app.get("/", (req, res) => {
  res.send("Welcome");
});

app.use("/user", userRouter);
app.use(authentication)
app.use("/notes", notesRouter);

app.listen(port, () => {
  try {
    connection;
    console.log("Connected db successfully");
  } catch (error) {
    console.log("Error to connect db");
    console.log(error);
  }
  console.log("Server running");
});
