const express = require("express");
const router = new express.Router();
const User = require("./Components/Users/user.controller");
const Task = require("./Components/Tasks/task.controller");

router.get("/", (req, res) => res.send("ok"));

// Users routes
router.post("/user/create", User.create);
router.post("/user/login", User.login);
// Tasks routes
router.post("/task/create/:id", Task.create);
router.delete("/task/:id", Task.DeleteByID);
router.put("/task/:id", Task.FindAndEditStatus);
router.get("task", Task.SortAndDisplay);

module.exports = router;
