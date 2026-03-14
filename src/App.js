import { useEffect, useState } from "react";
import "./App.css";
import bgImage from "./assets/bg.jpg";
import bunny from "./assets/download.png";

function App() {
  const [task, setTask] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [date, setDate] = useState("");
  const [tasks, setTasks] = useState([]);
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    const savedTheme = localStorage.getItem("darkMode");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
    }

    if (savedTheme !== null) {
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
        ? "bg-rose-500/20 text-rose-200 border border-rose-400/20"
        : "bg-rose-100 text-rose-600 border border-rose-200";
    }

    if (priority === "Medium") {
      return darkMode
        ? "bg-amber-500/20 text-amber-200 border border-amber-400/20"
        : "bg-amber-100 text-amber-700 border border-amber-200";
    }

    return darkMode
      ? "bg-emerald-500/20 text-emerald-200 border border-emerald-400/20"
      : "bg-emerald-100 text-emerald-700 border border-emerald-200";
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat relative flex items-center justify-center px-4 py-8"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
     
      <div
        className={`absolute inset-0 transition ${
          darkMode ? "bg-black/55" : "bg-white/45"
        }`}
      ></div>

      
      <div
        className={`relative z-10 w-full max-w-2xl rounded-[30px] border shadow-2xl backdrop-blur-xl transition ${
          darkMode
            ? "bg-[#171827]/80 border-white/10 text-white"
            : "bg-white/75 border-white/50 text-slate-800"
        }`}
      >
        <div className="p-5 sm:p-6 md:p-7">
         
          <div className="mb-6 flex items-start justify-between gap-4">
            <div className="flex items-start gap-3">
              <img
                src={bunny}
                alt="Bunny"
                className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
              />

              <div>
                <h1
                  className={`text-3xl sm:text-4xl ${
                    darkMode ? "text-[#fff2df]" : "text-slate-900"
                  }`}
                  style={{ fontFamily: "Georgia, serif" }}
                >
                  Zootopia Tasks
                </h1>

                <p
                  className={`mt-1 text-md ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  Try everything – organize your day!
                </p>
              </div>
            </div>

            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
                darkMode
                  ? "bg-white text-slate-900 hover:bg-slate-100"
                  : "bg-[#231c1c] text-white hover:bg-[#171212]"
              }`}
            >
              {darkMode ? "☀ Light Mode" : "☾ Dark Mode"}
            </button>
          </div>

         
          <div
            className={`rounded-[24px] border p-4 sm:p-5 mb-6 shadow-xl ${
              darkMode
                ? "bg-white/10 border-white/10"
                : "bg-white/35 border-white/45"
            }`}
          >
            <div className="flex flex-col gap-4">
              <input
                type="text"
                placeholder="Enter your task here..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className={`w-full rounded-xl px-5 py-3 outline-none border transition ${
                  darkMode
                    ? "bg-[#212431] border-white/10 text-white placeholder:text-slate-400"
                    : "bg-[#edf2ef] border-slate-200 text-slate-700"
                }`}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className={`rounded-xl px-4 py-3 outline-none border ${
                    darkMode
                      ? "bg-[#212431] border-white/10 text-white"
                      : "bg-[#edf2ef] border-slate-200 text-slate-700"
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
                  className={`rounded-xl px-4 py-3 outline-none border ${
                    darkMode
                      ? "bg-[#212431] border-white/10 text-white"
                      : "bg-[#edf2ef] border-slate-200 text-slate-700"
                  }`}
                />
              </div>

              <button
                onClick={addTask}
                className="w-full rounded-xl bg-gradient-to-r from-[#3387df] to-[#35c5c8] text-white font-semibold py-3 shadow-md hover:scale-[1.01] transition"
              >
                Add Task
              </button>
            </div>
          </div>

          
          <div className="space-y-3">
            {tasks.length === 0 ? (
              <div
                className={`rounded-[24px] border p-8 text-center min-h-[200px] flex flex-col items-center justify-center ${
                  darkMode
                    ? "bg-white/8 border-white/10"
                    : "bg-white/30 border-white/40"
                }`}
              >
                <img
                  src={bunny}
                  alt="Bunny"
                  className="w-20 h-20 object-contain mb-4"
                />

                <p
                  className={`text-xl font-semibold ${
                    darkMode ? "text-slate-300" : "text-slate-600"
                  }`}
                >
                  No tasks added yet
                </p>

                <p className="text-sm text-slate-400">
                  Add your first task and start planning
                </p>
              </div>
            ) : (
              tasks.map((item) => (
                <div
                  key={item.id}
                  className={`rounded-xl p-4 flex items-center justify-between gap-4 border shadow-md ${
                    darkMode
                      ? "bg-white/10 border-white/10"
                      : "bg-white/50 border-white/40"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={item.completed}
                      onChange={() => toggleComplete(item.id)}
                      className="h-5 w-5 accent-cyan-500"
                    />

                    <div>
                      <p
                        className={`text-lg ${
                          item.completed
                            ? "line-through text-slate-400"
                            : darkMode
                            ? "text-white"
                            : "text-slate-800"
                        }`}
                      >
                        {item.text}
                      </p>

                      <div className="flex gap-2 mt-2">
                        <span
                          className={`text-xs px-3 py-1 rounded-full ${getPriorityStyle(
                            item.priority
                          )}`}
                        >
                          {item.priority}
                        </span>

                        <span className="text-xs px-3 py-1 rounded-full bg-slate-200 text-slate-700">
                          {item.completed ? "Completed" : "Pending"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteTask(item.id)}
                    className="rounded-lg bg-rose-500 text-white px-4 py-2 text-sm hover:bg-rose-600 transition"
                  >
                    Delete
                  </button>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
