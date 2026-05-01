
const Project = require("../models/Project");

exports.createProject = async (req, res) => {
  const { name, members } = req.body;

  const project = await Project.create({
    name,
    members,
    createdBy: req.user.id
  });

  res.json(project);
};

exports.getProjects = async (req, res) => {
  const projects = await Project.find().populate("members", "name email");
  res.json(projects);
};