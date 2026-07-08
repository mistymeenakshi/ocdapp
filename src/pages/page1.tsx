import { useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../assets/page1.png";

function Page1() {
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;

    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
  };

  // Always display at least 5 rows
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
      <h1 className="h1">To Do List !</h1>

      <div className="input-container">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="task-input"
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        <button className="add-btn" onClick={addTask}>
          Add
        </button>
      </div>

      <div className="task-container">
        <ol className="list">
          {displayTasks.map((task, index) => (
            <li key={index} className={!task ? "empty-row" : ""}>
              {task || " "}
            </li>
          ))}
        </ol>
      </div>

      <button
        className="btn"
        onClick={() => navigate("/page2")}
      >
        Page2
      </button>
    </div>
  );
}

export default Page1;