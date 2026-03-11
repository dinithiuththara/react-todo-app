import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem("darkMode", JSON.stringify(darkMode));
  }, [darkMode]);

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
      return darkMode
        ? "bg-rose-900/40 text-rose-300 border border-rose-700"
        : "bg-rose-100 text-rose-600 border border-rose-200";
    }
    if (priority === "Medium") {
      return darkMode
        ? "bg-amber-900/40 text-amber-300 border border-amber-700"
        : "bg-amber-100 text-amber-700 border border-amber-200";
    }
    return darkMode
      ? "bg-emerald-900/40 text-emerald-300 border border-emerald-700"
      : "bg-emerald-100 text-emerald-700 border border-emerald-200";
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center p-6 transition-colors duration-300 ${
        darkMode
          ? "bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800"
          : "bg-gradient-to-br from-pink-100 via-rose-50 to-purple-100"
      }`}
    >
      <div
        className={`w-full max-w-2xl rounded-3xl p-8 shadow-2xl border transition-colors duration-300 ${
          darkMode
            ? "bg-slate-900/80 border-slate-700 text-white"
            : "bg-white/80 border-white/60 text-slate-800"
        }`}
      >
        <div className="mb-8 text-center relative">
          <h1 className="text-4xl font-bold">Todo App</h1>
          <p className={darkMode ? "text-slate-400 mt-2" : "text-slate-500 mt-2"}>
            Organize your day beautifully
          </p>

          <button
            onClick={() => setDarkMode(!darkMode)}
            className={`absolute right-0 top-0 px-4 py-2 rounded-xl text-sm font-medium transition ${
              darkMode
                ? "bg-yellow-400 text-slate-900 hover:bg-yellow-300"
                : "bg-slate-800 text-white hover:bg-slate-700"
            }`}
          >
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>

        <div
          className={`rounded-2xl shadow-lg p-5 mb-6 border transition-colors duration-300 ${
            darkMode
              ? "bg-slate-800 border-slate-700"
              : "bg-white border-slate-100"
          }`}
        >
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Enter your task here..."
              value={task}
              onChange={(e) => setTask(e.target.value)}
              className={`w-full rounded-xl px-4 py-3 outline-none border transition ${
                darkMode
                  ? "bg-slate-900 border-slate-600 text-white placeholder:text-slate-400 focus:ring-2 focus:ring-violet-400"
                  : "bg-white border-slate-200 text-slate-700 placeholder:text-slate-400 focus:ring-2 focus:ring-violet-300"
              }`}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className={`rounded-xl px-4 py-3 outline-none border transition ${
                  darkMode
                    ? "bg-slate-900 border-slate-600 text-white focus:ring-2 focus:ring-violet-400"
                    : "bg-white border-slate-200 text-slate-700 focus:ring-2 focus:ring-violet-300"
                }`}
              >
                <option value="High">High Priority</option>
                <option value="Medium">Medium Priority</option>
                <option value="Low">Low Priority</option>
              </select>

              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={`rounded-xl px-4 py-3 outline-none border transition ${
                  darkMode
                    ? "bg-slate-900 border-slate-600 text-white focus:ring-2 focus:ring-violet-400"
                    : "bg-white border-slate-200 text-slate-700 focus:ring-2 focus:ring-violet-300"
                }`}
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
            <div
              className={`rounded-2xl p-8 text-center border ${
                darkMode
                  ? "bg-slate-800 border-slate-700"
                  : "bg-slate-50 border-slate-200"
              }`}
            >
              <p className={darkMode ? "text-slate-300 text-lg" : "text-slate-500 text-lg"}>
                No tasks added yet
              </p>
              <p className={darkMode ? "text-slate-500 text-sm mt-1" : "text-slate-400 text-sm mt-1"}>
                Add your first task and start planning
              </p>
            </div>
          ) : (
            tasks.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border shadow-md transition ${
                  darkMode
                    ? "bg-slate-800 border-slate-700"
                    : "bg-white border-slate-100"
                }`}
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
                          ? darkMode
                            ? "line-through text-slate-500"
                            : "line-through text-slate-400"
                          : darkMode
                          ? "text-white"
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
                        <span
                          className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                            darkMode
                              ? "bg-blue-900/40 text-blue-300 border-blue-700"
                              : "bg-blue-100 text-blue-700 border-blue-200"
                          }`}
                        >
                          {item.date}
                        </span>
                      )}

                      <span
                        className={`text-xs font-semibold px-3 py-1 rounded-full border ${
                          item.completed
                            ? darkMode
                              ? "bg-emerald-900/40 text-emerald-300 border-emerald-700"
                              : "bg-emerald-100 text-emerald-700 border-emerald-200"
                            : darkMode
                            ? "bg-slate-700 text-slate-300 border-slate-600"
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