import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/page1.png";

function Page1() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [listType, setListType] = useState("ol");

  // Animation state
  const [animateAdd, setAnimateAdd] = useState(false);

  // Add Task
  const addTask = () => {
    if (newTask.trim() === "") return;

    setTasks([...tasks, newTask.trim()]);
    setNewTask("");

    // Trigger button animation
    setAnimateAdd(true);

    setTimeout(() => {
      setAnimateAdd(false);
    }, 500);
  };

  // Save Tasks
  const saveTasks = () => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    alert("Tasks saved successfully!");
  };

  // Load Tasks
  const loadTasks = () => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
      setTasks(JSON.parse(savedTasks));
      alert("Tasks loaded successfully!");
    } else {
      alert("No saved tasks found!");
    }
  };

  // Display 8 rows minimum
  const displayTasks = [
    ...tasks,
    ...Array(Math.max(0, 8 - tasks.length)).fill("")
  ];

  return (
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >
      <h1 className="h1">✨ To Do List ✨</h1>

      {/* Input Section */}
      <div className="input-container">

        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        <button
          className={`add-btn ${animateAdd ? "clicked" : ""}`}
          onClick={addTask}
        >
          ➕ Add
        </button>

        <button className="add-btn" onClick={saveTasks}>
          💾 Save
        </button>

        <button className="add-btn" onClick={loadTasks}>
          📂 Load
        </button>

      </div>

      {/* List Type */}
      <div
        style={{
          marginBottom: "20px",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >
        <label style={{ marginRight: "20px" }}>
          <input
            type="radio"
            value="ol"
            checked={listType === "ol"}
            onChange={(e) => setListType(e.target.value)}
          />
          {" "}Ordered List
        </label>

        <label>
          <input
            type="radio"
            value="ul"
            checked={listType === "ul"}
            onChange={(e) => setListType(e.target.value)}
          />
          {" "}Unordered List
        </label>
      </div>

      {/* Task Container */}
      <div className="task-container">

        {listType === "ol" ? (
          <ol className="list">
            {displayTasks.map((task, index) => (
              <li
                key={index}
                className={!task ? "empty-row" : "task-item"}
              >
                {task || " "}
              </li>
            ))}
          </ol>
        ) : (
          <ul className="list">
            {displayTasks.map((task, index) => (
              <li
                key={index}
                className={!task ? "empty-row" : "task-item"}
              >
                {task || " "}
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* Navigate Button */}
      <button
        className="btn"
        onClick={() => navigate("/page2")}
      >
        ➜ Page 2
      </button>

    </div>
  );
}

export default Page1;