// Import the useState Hook from React.
// useState allows us to create and manage state (dynamic data) inside a functional component.
import { useState } from "react";

// Import useNavigate from React Router.
// It is used to move (navigate) from one page/component to another.
import { useNavigate } from "react-router-dom";

// Import the background image that will be displayed on this page.
import bgImage from "../assets/page1.png";

// Functional Component.
// Every React component starts like this.
// This component represents Page1 of the application.
function Page1() {

  // Create the navigate function.
  // Calling navigate("/page2") changes the current page to Page2.
  const navigate = useNavigate();

  // ---------------- STATE VARIABLES ----------------

  // Stores all the tasks entered by the user.
  // Initially it is an empty array because no tasks exist.
  const [tasks, setTasks] = useState([]);

  // Stores the current text typed inside the input box.
  // Initially it is an empty string.
  const [newTask, setNewTask] = useState("");

  // Stores which list type the user selected.
  // Default value is "ol" (Ordered List).
  const [listType, setListType] = useState("ol");

  // Stores whether the Add button animation should play.
  // Initially false because the button isn't being clicked.
  const [animateAdd, setAnimateAdd] = useState(false);

  // ---------------- ADD TASK FUNCTION ----------------

  // Function called when the Add button is clicked.
  const addTask = () => {

    // trim() removes spaces from the beginning and end.
    // Prevents users from adding empty tasks.
    if (newTask.trim() === "") return;

    // Add the new task into the tasks array.
    // ...tasks copies all existing tasks.
    // newTask.trim() is added at the end.
    setTasks([...tasks, newTask.trim()]);

    // Clear the input box after adding the task.
    setNewTask("");

    // Turn animation ON.
    setAnimateAdd(true);

    // After 500 milliseconds turn animation OFF.
    // This allows the CSS animation to finish.
    setTimeout(() => {
      setAnimateAdd(false);
    }, 500);
  };

  // ---------------- SAVE TASKS ----------------

  // Save all tasks into browser Local Storage.
  const saveTasks = () => {

    // localStorage only stores strings.
    // JSON.stringify converts the array into a string.
    localStorage.setItem("tasks", JSON.stringify(tasks));

    // Show confirmation message.
    alert("Tasks saved successfully!");
  };

  // ---------------- LOAD TASKS ----------------

  // Load saved tasks from Local Storage.
  const loadTasks = () => {

    // Read the value stored with key "tasks".
    const savedTasks = localStorage.getItem("tasks");

    // Check if tasks actually exist.
    if (savedTasks) {

      // JSON.parse converts the string back into an array.
      setTasks(JSON.parse(savedTasks));

      // Show success message.
      alert("Tasks loaded successfully!");
    } else {

      // Show message if nothing is saved.
      alert("No saved tasks found!");
    }
  };

  // ---------------- DISPLAY TASKS ----------------

  // This creates a new array for displaying.
  // If there are fewer than 8 tasks,
  // empty strings are added so that exactly 8 rows appear.
  const displayTasks = [
    ...tasks,

    // Math.max ensures the number never becomes negative.
    // Array(n).fill("") creates n empty rows.
    ...Array(Math.max(0, 8 - tasks.length)).fill("")
  ];

  // ---------------- JSX (UI) ----------------

  // JSX is what React returns to display on the webpage.
  return (

    // Main container.
    // Background image is applied using inline CSS.
    <div
      className="container"
      style={{
        backgroundImage: `url(${bgImage})`,
      }}
    >

      {/* Main page heading */}
      <h1 className="h1">✨ To Do List ✨</h1>

      {/* Input Section */}
      <div className="input-container">

        {/* Text input for entering new task */}
        <input

          // HTML input type
          type="text"

          // Text shown before typing
          placeholder="Enter a task..."

          // Current value comes from state.
          // Makes this a controlled component.
          value={newTask}

          // Whenever user types,
          // update newTask state.
          onChange={(e) => setNewTask(e.target.value)}

          // CSS styling class.
          className="task-input"

          // If Enter key is pressed,
          // automatically call addTask().
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />

        {/* Add Button */}
        <button

          // Apply animation class only when animateAdd is true.
          className={`add-btn ${animateAdd ? "clicked" : ""}`}

          // Call addTask when clicked.
          onClick={addTask}
        >

          {/* Button text */}
          ➕ Add

        </button>

        {/* Save Button */}
        <button

          className="add-btn"

          // Save tasks into Local Storage.
          onClick={saveTasks}
        >
          💾 Save
        </button>

        {/* Load Button */}
        <button

          className="add-btn"

          // Load tasks from Local Storage.
          onClick={loadTasks}
        >
          📂 Load
        </button>

      </div>

      {/* ---------------- LIST TYPE SELECTION ---------------- */}

      <div
        style={{
          marginBottom: "20px",
          color: "white",
          fontSize: "20px",
          fontWeight: "bold"
        }}
      >

        {/* Ordered List Radio Button */}
        <label style={{ marginRight: "20px" }}>

          <input

            // Radio button input.
            type="radio"

            // Value stored when selected.
            value="ol"

            // Checked if listType equals "ol".
            checked={listType === "ol"}

            // Update listType when selected.
            onChange={(e) => setListType(e.target.value)}
          />

          {" "}Ordered List

        </label>

        {/* Unordered List Radio Button */}
        <label>

          <input
            type="radio"
            value="ul"

            // Checked if listType equals "ul".
            checked={listType === "ul"}

            // Change list type.
            onChange={(e) => setListType(e.target.value)}
          />

          {" "}Unordered List

        </label>

      </div>

      {/* ---------------- TASK DISPLAY ---------------- */}

      <div className="task-container">

        {/* If Ordered List is selected */}
        {listType === "ol" ? (

          // Display tasks inside an ordered list.
          <ol className="list">

            {/* Loop through displayTasks */}
            {displayTasks.map((task, index) => (

              // Each task becomes one list item.
              <li

                // React requires unique keys.
                // Index is acceptable here because order doesn't change.
                key={index}

                // Empty rows get different styling.
                className={!task ? "empty-row" : "task-item"}
              >

                {/* Show task text.
                    If empty, show blank space. */}
                {task || " "}

              </li>
            ))}

          </ol>

        ) : (

          // Otherwise show unordered list.
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

      {/* ---------------- PAGE NAVIGATION ---------------- */}

      <button

        className="btn"

        // Navigate to Page2 when clicked.
        onClick={() => navigate("/page2")}
      >

        ➜ Page 2

      </button>

    </div>
  );
}

// Export this component.
// Makes it available to use inside App.jsx or other files.
export default Page1;