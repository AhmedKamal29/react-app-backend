const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const todo = require("./models/task");

const app = express();

app.use(express.json());
app.use(cors("*"));

// Create
app.post("/task", async (req, res) => {
  const { Task, Priority } = req.body;

  try {
    const task = await todo.create({ Task, Priority });
    return res.json(task);
  } catch (err) {
    console.log(err);
    return res.res.status(500).json({ error: "something went wrong" });
  }
});

//Read
// app.get("/task", async (req, res) => {
//   try {
//     const taskss = await Task.find();
//     return res.json(taskss);
//   } catch (err) {
//     console.log(err);
//     return res.status(500).json(err);
//   }
// });

// Delete
app.delete("/task/:id", async (req, res) => {
  // dont forget the backslash
  const id = req.params.id;
  try {
    await todo.findByIdAndDelete(id);

    res.json({ message: "Task is deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.put("/task/:id", async (req, res) => {
  const id = req.params.id;
  const { Task, Status } = req.body;
  try {
    const tsk = await todo.findById(id).orFail();

    tsk.Task = Task || tsk.Task;
    tsk.Status === true ? (tsk.Status = false) : (tsk.Status = true);
    await tsk.save();

    res.json(tsk);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ err: "Something went wrong" });
  }
});

//sorting

// sort by the timestamp
app.get("/task", async (req, res) => {
  const { sortBy } = req.query;
  let tasks;
  if (sortBy && sortBy.toLowerCase() === "priority") {
    tasks = await todo.find().sort({ Priority: 1 });
  } else if (sortBy && sortBy.toLowerCase() === "date") {
    tasks = await todo.find().sort({ createdAt: 1 });
  } else {
    tasks = await todo.find().sort({ createdAt: -1 });
  }
  return res.json(tasks);
});

app.listen(5000, () => {
  console.log("Server is on port 5000");
  mongoose
    .connect(
      "mongodb+srv://ahmed:ahmed123@cluster0.vqzwd.mongodb.net/ToDoApp",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => console.log("database connected"))
    .catch((err) => console.log(err));
});
