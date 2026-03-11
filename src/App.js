import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: task,
      completed: false,
      priority,
      date,
    };

    setTasks([newTask, ...tasks]);
    setTask("");
    setPriority("Medium");
    setDate("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const toggleComplete = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const getPriorityStyle = (priority) => {
    if (priority === "High") {
      return "bg-rose-100 text-rose-600 border border-rose-200";
    }
    if (priority === "Medium") {
      return "bg-amber-100 text-amber-700 border border-amber-200";
    }
    return "bg-emerald-100 text-emerald-700 border border-emerald-200";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white/80 backdrop-blur-md shadow-2xl border border-white/60 p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-slate-800">Todo App</h1>
          <p className="text-slate-500 mt-2">
            Organize your day beautifully
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 p-5 mb-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your task here..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="rounded-xl border border-slate-200 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-violet-300 focus:border-violet-300"
              />
            </div>

            <button
              onClick={addTask}
              className="w-full rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white font-semibold py-3 shadow-md hover:scale-[1.01] hover:shadow-lg transition"
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <div className="rounded-2xl bg-slate-50 border border-dashed border-slate-200 p-8 text-center">
              <p className="text-slate-500 text-lg">No tasks added yet</p>
              <p className="text-slate-400 text-sm mt-1">
                Add your first task and start planning
              </p>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                key={item.id}
                className="rounded-2xl bg-white shadow-md border border-slate-100 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={item.completed}
                    onChange={() => toggleComplete(item.id)}
                    className="mt-1 h-5 w-5 accent-violet-500"
                  />

                  <div>
                    <p
                      className={`text-lg font-medium ${
                        item.completed
                          ? "line-through text-slate-400"
                          : "text-slate-800"
                      }`}
                    >
                      {item.text}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-3">
                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full ${getPriorityStyle(
                          item.priority
                        )}`}
                      >
                        {item.priority}
                      </span>

                      {item.date && (
                        <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-700 border border-blue-200">
                          {item.date}
                        </span>
                      )}

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                          item.completed
                            ? "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : "bg-slate-100 text-slate-600 border-slate-200"
                        }`}
                      >
                        {item.completed ? "Completed" : "Pending"}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => deleteTask(item.id)}
                  className="self-start sm:self-center rounded-xl bg-rose-500 text-white px-4 py-2 font-medium hover:bg-rose-600 transition shadow-sm"
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default App;