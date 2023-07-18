import { useState } from "react";
import { LuClipboardEdit } from 'react-icons/lu';
import { ImBin } from 'react-icons/im';

function App() {
  const [data, setData] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [editIndex, setEditIndex] = useState(-1);
  const [editValue, setEditValue] = useState("");
  console.log(data);

  const addTask = (task) => {
    if (editIndex !== -1) {
      // If editing an existing task
      const updatedTasks = [...tasks];
      updatedTasks[editIndex] = task;
      setTasks(updatedTasks);
      setEditIndex(-1);
      setEditValue("");
    } else {
      // If adding a new task
      setTasks([...tasks, task]);
    }
  };

  const completeTask = (taskIndex) => {
    setCompletedTasks(completedTasks.filter((items) => items !== taskIndex));
    setData([...data, taskIndex]);
  };

  const deleteData = (index1) => {
    const updatedTasks1 = data.filter((_, index) => index !== index1);
    setData(updatedTasks1);
  };

  const removeTask = (taskIndex) => {
    const updatedTasks = tasks.filter((_, index) => index !== taskIndex);
    setTasks(updatedTasks);
  };

  const editTask = (taskIndex) => {
    const taskToEdit = tasks[taskIndex];
    setEditIndex(taskIndex);
    setEditValue(taskToEdit);
  };

  return (
    <div className="container mx-auto px-4 mt-4">
      <h1 className="text-2xl font-bold mb-4 text-center">To-do App</h1>
      <div className="flex mb-4 justify-center">
        <input
          type="text"
          className="border border-gray-300 px-2 py-1 rounded mr-2 w-[20em]"
          placeholder="Enter a new task"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
        />
        <button
          className=" bg-emerald-400 hover:bg-emerald-700 text-white px-4 py-1 rounded"
          onClick={() => addTask(editValue)}
        >
          {editIndex !== -1 ? "Update Task" : "Add Task"}
        </button>
      </div>
      <div className="flex gap-6">
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-2">Task List</h2>
          <ul>
            {tasks.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <span>{task}</span>
                <div>
                  <button
                    className="text-green-500 hover:text-green-600 font-bold mr-2"
                    onClick={() => completeTask(task)}
                  >
                    Complete
                  </button>
                  <button
                    className=" text-gray-900 hover:text-gray-500 mr-2"
                    onClick={() => editTask(index)}
                  >
                    <LuClipboardEdit />
                  </button>
                  <button
                    className="text-red-500 hover:text-red-600"
                    onClick={() => removeTask(index)}
                  >
                    <ImBin />
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-1/2">
          <h2 className="text-lg font-bold mb-2">Completed Tasks</h2>
          <ul>
            {data.map((task, index) => (
              <li
                key={index}
                className="flex items-center justify-between mb-2"
              >
                <span>{task}</span>
                <button
                  className="text-red-500 hover:text-red-600"
                  onClick={() => deleteData(index)}
                >
                  <ImBin />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;