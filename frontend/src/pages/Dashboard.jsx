import { useEffect, useState } from "react";
import API from "../services/api";
import Layout from "../components/Layout";

export default function Dashboard() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    API.get("/api/tasks").then(res => setTasks(res.data));
  }, []);

  const completed = tasks.filter(t => t.status === "done").length;
  const pending = tasks.length - completed;

  return (
    <Layout>
      <div className="p-6 bg-slate-100 min-h-screen">

        {/* HEADER */}
        <h1 className="text-2xl font-semibold mb-6 text-gray-800">
          Dashboard
        </h1>

        {/* STATS */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card title="Total Tasks" value={tasks.length} color="bg-blue-500" />
          <Card title="Completed" value={completed} color="bg-green-500" />
          <Card title="Pending" value={pending} color="bg-yellow-500" />
        </div>

        {/* TASK LIST */}
        <div className="bg-white rounded-2xl shadow p-5">
          <h2 className="font-semibold text-gray-700 mb-4">
            Recent Tasks
          </h2>

          {tasks.length === 0 ? (
            <p className="text-gray-400 text-sm">No tasks available</p>
          ) : (
            <div className="space-y-3">
              {tasks.slice(0, 5).map(task => (
                <div
                  key={task._id}
                  className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">
                      {task.title}
                    </p>
                    <p className="text-xs text-gray-400">
                      {task.deadline?.slice(0, 10)}
                    </p>
                  </div>

                  <StatusBadge status={task.status} />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </Layout>
  );
}

function Card({ title, value, color }) {
  return (
    <div className={`p-5 rounded-2xl text-white shadow-md ${color}`}>
      <p className="text-sm opacity-80">{title}</p>
      <h2 className="text-3xl font-bold">{value}</h2>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    done: "bg-green-100 text-green-700",
    "in-progress": "bg-yellow-100 text-yellow-700",
    pending: "bg-gray-200 text-gray-700",
  };

  return (
    <span
      className={`px-3 py-1 text-xs rounded-full font-medium ${
        styles[status] || styles.pending
      }`}
    >
      {status}
    </span>
  );
}