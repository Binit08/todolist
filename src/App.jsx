import React, { useEffect, useState } from "react";
import { FcAddDatabase } from "react-icons/fc";
import { TfiWrite } from "react-icons/tfi";
import { FaRegTrashCan } from "react-icons/fa6";
import "./App.css";

function App() {
  const [value, setValue] = useState("");
  const [task, setTask] = useState([]);
  const [editIndex, setEditIndex] = useState(null);


  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      setTask(JSON.parse(storedTasks));
    }
  }, []);

 
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(task));
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim() !== "") {
      if (editIndex !== null) {
    
        const updatedTasks = task.map((item, index) =>
          index === editIndex ? value : item
        );
        setTask(updatedTasks);
        setEditIndex(null);
      } else {
   
        setTask([...task, value]);
      }
      setValue(""); 
    } else {
      console.log("Input is empty");
    }
  };

  const handleDelete = (index) => {
    const nonDeletedTasks = task.filter((_, idx) => idx !== index);
    setTask(nonDeletedTasks);
  };

  const handleUpdate = (index) => {
    setEditIndex(index);
    setValue(task[index]);
  };

  const clearTasks = () => {
    setTask([]);
    localStorage.removeItem("tasks");
  };

  return (
    <div className="relative h-screen flex items-center justify-center text-white">
  
      

      {/* Task List Container */}
      <div className="relative bg-transparent border rounded-lg p-6 w-full max-w-md h-[60vh] overflow-hidden">
        <form onSubmit={handleSubmit} className="flex mb-4">
          <input
            type="text"
            placeholder="What’s your task for today?"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            className="flex-grow p-2 border bg-transparent rounded mr-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white rounded">
            <FcAddDatabase />
          </button>
        </form>
        <button
          onClick={clearTasks}
          className="w-full p-2 bg-red-500 text-white rounded mb-4"
        >
          Clear All Tasks
        </button>
        <div className="overflow-y-auto max-h-[40vh]">
          {task.map((item, index) => (
            <div
              key={index}
              className="p-2 border-2 border-gray-300 flex justify-between items-center mb-2 bg-transparent rounded"
            >
              <div>{item}</div>
              <div className="flex gap-4">
                <div
                  onClick={() => handleUpdate(index)}
                  className="cursor-pointer text-blue-500"
                >
                  <TfiWrite />
                </div>
                <div
                  onClick={() => handleDelete(index)}
                  className="cursor-pointer text-red-500"
                >
                  <FaRegTrashCan />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
