const { model, Schema } = require("mongoose");

const TaskSchema = new Schema(
  {
    Task: {
      type: String,
      required: [true, "task is a required field and cannot be empty"],
    },
  },
  { timestamps: true }
);

const Task = model("Task", TaskSchema);
module.exports = Task;
