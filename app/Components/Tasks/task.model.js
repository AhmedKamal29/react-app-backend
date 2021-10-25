const { model, Schema } = require("mongoose");

const TaskSchema = new Schema(
  {
    Task: {
      type: String,
      required: [true, "task is a required field and cannot be empty"],
    },
    Status: {
      type: Boolean,
      default: false,
      required: true,
    },
    Priority: {
      type: Number,
      enum: [1, 2, 3],
      default: 2,
      required: true,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "Users",
    },
  },
  { timestamps: true }
);

const Task = model("Task", TaskSchema);
module.exports = Task;
