const mongoose = require("mongoose");
const express = require("express");

const todo = require("./models/task");

const app = express();

app.use(express.json());

// Create
app.post("/task", async (req, res) => {
  const { Task } = req.body;

  try {
    const task = await todo.create({ Task });

    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.res.status(500).json({ error: "somethiing went wrong" });
  }
});

//Read
app.get("/task", async (req, res) => {
  try {
    const taskss = await todo.find();
    return res.json(taskss);
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
});

// Delete
app.delete("/task/:id", async (req, res) => {
  // dont foret the backslash
  const id = req.params.id;
  try {
    await todo.findByIdAndDelete(id);

    res.json({ message: "Task is deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(5000, () => {
  console.log("Server is on port 5000");
  mongoose
    .connect("mongodb+srv://ahmed:ahmed123@cluster0.vqzwd.mongodb.net/test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
});
