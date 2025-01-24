import React, { useState, useEffect } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import Swal from "sweetalert2";
import { HTML5Backend } from "react-dnd-html5-backend";
import axios from "axios";
import { FaCheck, FaClock, FaRegCheckCircle, FaTrash } from "react-icons/fa";


import Header from "../../component/Header";
import { FaPen } from "react-icons/fa"; 
import Footer from "../../component/Footer";
import { API_BASE_URL } from "../../utils/api";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [taskName, setTaskName] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/tasks`);
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Add new task
  const handleAddTask = async () => {
    if (taskName && taskDescription) {
      if (taskName.length !== 4) {
        alert("Task name must be exactly 4 characters long.");
        return;
      }
      try {
        const newTask = { name: taskName, description: taskDescription, status: "Pending" };
        const response = await axios.post(`${API_BASE_URL}/tasks`, newTask);
        setTasks([...tasks, response.data]);
        setTaskName("");
        setTaskDescription("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  // Update task status
  const handleTaskUpdate = async (taskId, newStatus) => {
    try {
      await axios.put(`${API_BASE_URL}/tasks/${taskId}`, { status: newStatus });
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      console.error("Error updating task status:", error);
    }
  };

  // Edit task details
  const handleEditTask = (task) => {
    setEditingTask(task);
    setTaskName(task.name);
    setTaskDescription(task.description);
  };

  // Save edited task
  const handleSaveEditTask = async () => {
    if (taskName && taskDescription && editingTask) {
      try {
        const updatedTask = { name: taskName, description: taskDescription };
        const response = await axios.put(`${API_BASE_URL}/taskedit/${editingTask._id}`, updatedTask);
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === editingTask._id ? { ...task, ...updatedTask } : task
          )
        );
        setEditingTask(null);
        setTaskName("");
        setTaskDescription("");
      } catch (error) {
        console.error("Error editing task:", error);
      }
    }
  };



  const handleDeleteTask = async (taskId) => {
    // Show confirmation dialog before deletion
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
  
    // If confirmed, proceed with deletion
    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
        setTasks(tasks.filter((task) => task._id !== taskId));
        Swal.fire("Deleted!", "Your task has been deleted.", "success");
      } catch (error) {
        console.error("Error deleting task:", error);
        Swal.fire("Error", "There was an error deleting the task.", "error");
      }
    }
  };
  

  return (
    
    <DndProvider backend={HTML5Backend}>
      <Header/>
      <div className="p- py-8 bg-blue-100 rounded-md mb-8">
        <h1 className="text-3xl font-bold text-center">Task Manager</h1>
        <p className="text-center text-gray-700 mt-2">Manage your tasks with ease.</p>
      </div>

      <div className="flex justify-between px-16 py-24 gap-8">
        <div className="w-full">
          <h2 className="text-lg font-bold mb-4">Add New Task</h2>
          <div className="mb-4 space-y-4">
            <input
              type="text"
              placeholder="Task Name"
              value={taskName}
              onChange={(e) => setTaskName(e.target.value)}
              className="p-2 border rounded mr-2 w-full"
            />
            <textarea
              placeholder="Task Description"
              value={taskDescription}
              onChange={(e) => setTaskDescription(e.target.value)}
              className="p-2 border rounded w-full"
            />
          </div>
          <button
            onClick={editingTask ? handleSaveEditTask : handleAddTask}
            className="bg-blue-500 text-white p-2 rounded w-full"
          >
            {editingTask ? "Save Changes" : "Add Task"}
          </button>
        </div>

      
        <TaskSection
          title="Pending"
          icon={<FaClock className="text-yellow-500" />}
          tasks={tasks.filter((task) => task.status === "Pending")}
          onTaskDrop={(taskId) => handleTaskUpdate(taskId, "Pending")}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskSection
          title="Complete"
          icon={<FaRegCheckCircle className="text-green-500" />}
          tasks={tasks.filter((task) => task.status === "Complete")}
          onTaskDrop={(taskId) => handleTaskUpdate(taskId, "Complete")}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
        <TaskSection
          title="Done"
          icon={<FaCheck className="text-blue-500" />}
          tasks={tasks.filter((task) => task.status === "Done")}
          onTaskDrop={(taskId) => handleTaskUpdate(taskId, "Done")}
          onEditTask={handleEditTask}
          onDeleteTask={handleDeleteTask}
        />
      </div>
      <Footer/>
    </DndProvider>
  );
};







const TaskSection = ({ title, icon, tasks, onTaskDrop, onEditTask, onDeleteTask }) => {
  const [, dropRef] = useDrop({
    accept: "TASK",
    drop: (item) => onTaskDrop(item._id),
  });

  return (
    <div
      ref={dropRef}
      className="w-1/3 p-6 border-2 rounded-lg shadow-lg bg-white h-[400px] overflow-auto"
    >
      <div className="flex items-center mb-4">
        <div className="mr-2 text-2xl">{icon}</div>
        <h2 className="text-xl font-bold">{title}</h2>
      </div>
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks in this category</p>
      ) : (
        tasks.map((task) => (
          <Task key={task._id} task={task} onEditTask={onEditTask} onDeleteTask={onDeleteTask} />
        ))
      )}
    </div>
  );
};








const Task = ({ task, onEditTask, onDeleteTask }) => {
  const [{ isDragging }, dragRef] = useDrag({
    type: "TASK",
    item: { _id: task._id },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <div
    ref={dragRef}
    className={`p-3 mb-3 border rounded-lg bg-white shadow-md ${isDragging ? "opacity-50" : "opacity-100"}`}
  >
    <div className="flex justify-between items-center mb-2 px-5 hover:shadow-lg">
      <span className="font-bold text-sm mr-2">{task.name}</span>
      <div className="flex space-x-1">
        <button
          onClick={() => onEditTask(task)}
          className="bg-yellow-500 text-white px-2 py-1 text-xs rounded flex items-center space-x-1"
        >
          <FaPen className="text-white text-xs" />
       
        </button>
        <button
          onClick={() => onDeleteTask(task._id)}
          className="bg-red-500 text-white px-2 py-1 text-xs rounded"
        >
          <FaTrash className="text-white text-xs" /> 
        
        </button>
      </div>
    </div>
    <p className="text-gray-600 text-xs">{task.description}</p>
  </div>
  
  );
};

export default TaskManager;
