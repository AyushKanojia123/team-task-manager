const router = require("express").Router();
const { createTask, getTasks, updateTask } = require("../controllers/taskController");
const { protect } = require("../middleware/authMiddleware");
const Task = require("../models/Task");

router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTask);

// ✅ FIXED DELETE
router.delete("/:id", protect, async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ msg: "Task deleted" });
});

module.exports = router;