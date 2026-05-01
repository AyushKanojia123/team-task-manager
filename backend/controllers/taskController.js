
const Task = require("../models/Task");


exports.createTask = async (req, res) => {
  const { title, assignedTo, project, deadline } = req.body;

  const task = await Task.create({
    title,
    assignedTo,
    project,
    deadline
  });

  res.json(task);
};

exports.getTasks = async (req, res) => {
  const tasks = await Task.find()
    .populate("assignedTo", "name")
    .populate("project", "name");

  res.json(tasks);
};


exports.updateTask = async (req, res) => {
  const task = await Task.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.json(task);
};