import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);

  const [formData, setFormData] = useState({
    title: "",
    status: "pending",
    deadline: "",
  });

  // 🔄 Fetch tasks
  useEffect(() => {
    API.get("/api/tasks").then(res => setTasks(res.data));
  }, []);

  // ➕ Add Task
  const addTask = async () => {
    const res = await API.post("/api/tasks", formData);
    setTasks(prev => [res.data, ...prev]);
    resetForm();
  };

  // ✏️ Update Task
  const updateTask = async () => {
    const res = await API.put(`/api/tasks/${editId}`, formData);

    setTasks(tasks.map(t => (t._id === editId ? res.data : t)));
    resetForm();
  };

  // 🗑️ Delete Task
  const deleteTask = async (id) => {
    await API.delete(`/api/tasks/${id}`);
    setTasks(tasks.filter(t => t._id !== id));
  };

  // 🔄 Change status inline
  const changeStatus = async (id, status) => {
    const res = await API.put(`/api/tasks/${id}`, { status });

    setTasks(tasks.map(t => (t._id === id ? res.data : t)));
  };

  const startEdit = (task) => {
    setEditId(task._id);
    setFormData({
      title: task.title,
      status: task.status,
      deadline: task.deadline?.slice(0, 10) || "",
    });
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: "", status: "pending", deadline: "" });
    setEditId(null);
    setShowForm(false);
  };

  return (
    <Layout>
      <div className="p-6 bg-slate-900 min-h-screen text-white">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-semibold">Tasks</h1>

          <button
            onClick={() => setShowForm(true)}
            className="bg-indigo-600 px-4 py-2 rounded-lg"
          >
            + New Task
          </button>
        </div>

        {/* FORM */}
        {showForm && (
          <div className="mb-6 bg-slate-800 p-5 rounded-xl border border-slate-700">
            <h2 className="mb-4 font-medium">
              {editId ? "Edit Task" : "Create Task"}
            </h2>

            <div className="grid gap-3">

              <input
                placeholder="Task Title"
                className="p-2 rounded bg-slate-700 border border-slate-600"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />

              <select
                className="p-2 rounded bg-slate-700 border border-slate-600"
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
              </select>

              <input
                type="date"
                className="p-2 rounded bg-slate-700 border border-slate-600"
                value={formData.deadline}
                onChange={(e) =>
                  setFormData({ ...formData, deadline: e.target.value })
                }
              />

              <div className="flex gap-2">
                <button
                  onClick={editId ? updateTask : addTask}
                  className="bg-green-600 px-4 py-2 rounded"
                >
                  {editId ? "Update" : "Add"}
                </button>

                <button
                  onClick={resetForm}
                  className="bg-gray-500 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </div>

            </div>
          </div>
        )}

        {/* TABLE */}
        <div className="bg-slate-800 border border-slate-700 rounded-xl overflow-hidden">

          <table className="w-full text-sm">
            <thead className="bg-slate-700 text-slate-300 text-left">
              <tr>
                <th className="p-4">Task</th>
                <th className="p-4">Status</th>
                <th className="p-4">Deadline</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>

            <tbody>
              {tasks.map(task => (
                <tr
                  key={task._id}
                  className="border-t border-slate-700 hover:bg-slate-700"
                >
                  <td className="p-4">{task.title}</td>

                  {/* 🔄 STATUS DROPDOWN */}
                  <td className="p-4">
                    <select
                      value={task.status}
                      onChange={(e) =>
                        changeStatus(task._id, e.target.value)
                      }
                      className="bg-slate-700 border border-slate-600 rounded p-1"
                    >
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="done">Done</option>
                    </select>
                  </td>

                  <td className="p-4">
                    {task.deadline?.slice(0, 10) || "—"}
                  </td>

                  {/* ACTIONS */}
                  <td className="p-4 flex gap-3">
                    <button
                      onClick={() => startEdit(task)}
                      className="text-blue-400 hover:underline"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteTask(task._id)}
                      className="text-red-400 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </div>
    </Layout>
  );
}