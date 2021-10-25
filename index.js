const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();

//middelwares
app.use(cors());
app.use(express.json());
mongoose.connect(
  "mongodb+srv://ahmed:ahmed123@cluster0.vqzwd.mongodb.net/ToDoAppModified",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

//routes
app.use(require("./app/routes"));

app.listen(5000, () => console.log("Server is online"));
