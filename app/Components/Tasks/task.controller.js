const Tasks = require("./task.model");
const Users = require("../Users/user.model");

module.exports = {
  create: async (req, res) => {
    const user = req.params;
    const id = user.id;

    const { Task, Priority } = req.body;
    const task = await Tasks.create({ Task, Priority, user: id });
    await task.save();

    const userById = await Users.findById(id);
    userById.tasks.push(task);
    await userById.save();

    return res.send(userById);
  },

  DeleteByID: async (req, res) => {
    const id = req.params.id;
    await todo.findByIdAndDelete(id);
    res.json({ message: "Task is deleted successfully" });
  },

  FindAndEditStatus: async (req, res) => {
    const id = req.params.id;
    const { Task, Status } = req.body;
    const tsk = await todo.findById(id).orFail();

    tsk.Task = Task || tsk.Task;
    tsk.Status === true ? (tsk.Status = false) : (tsk.Status = true);
    await tsk.save();
    res.json(tsk);
  },

  SortAndDisplay: async (req, res) => {
    const { sortBy } = req.query;
    let tasks;

    if (sortBy && sortBy.toLowerCase() === "priority") {
      tasks = await todo.find().sort({ Priority: 1 });
    } else if (sortBy && sortBy.toLowerCase() === "date") {
      tasks = await todo.find().sort({ createdAt: 1 });
    } else if (sortBy && sortBy.toLowerCase() === "none") {
      tasks = await todo.find().sort({ createdAt: -1 });
    } else {
      tasks = await todo.find().sort({ createdAt: -1 });
    }
    return res.json(tasks);
  },
  userByTask: async (req, res) => {
    const id = req.params;
    const userByTask = await todo.findById(id).populate("user");
    res.send(userByTask);
  },
};
