import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; 
import "./Home.css";

const Home = () => {
  const [boards, setBoards] = useState([]);  
  const [boardInput, setBoardInput] = useState(""); 
  const [draggedTask, setDraggedTask] = useState(null); 


  const navigate = useNavigate();

  const addBoard = () => {    
    if (boardInput.trim()) {
      setBoards([...boards, { name: boardInput, tasks: [] }]);
      setBoardInput("");
    }
  };

  const deleteBoard = (boardIndex) => {
    const updatedBoards = boards.filter((_, index) => index !== boardIndex); 
    setBoards(updatedBoards);
  };

  const addTask = (boardIndex, taskName) => {
    if (!taskName.trim()) return;
    const updatedBoards = boards.map((board, index) =>
      index === boardIndex
        ? {
            ...board,
            tasks: [...board.tasks, { name: taskName, editable: false }],
          }
        : board
    );
    setBoards(updatedBoards);
  };

  const deleteTask = (boardIndex, taskIndex) => {
    const updatedBoards = boards.map((board, index) =>
      index === boardIndex
        ? {
            ...board,
            tasks: board.tasks.filter((_, tIndex) => tIndex !== taskIndex),
          }
        : board
    );
    setBoards(updatedBoards);
  };

  const toggleEditTask = (boardIndex, taskIndex) => {
    const updatedBoards = boards.map((board, index) =>
      index === boardIndex
        ? {
            ...board,
            tasks: board.tasks.map((task, tIndex) =>
              tIndex === taskIndex
                ? { ...task, editable: !task.editable }
                : task
            ),
          }
        : board
    );
    setBoards(updatedBoards);
  };

  const updateTask = (boardIndex, taskIndex, newTaskName) => {
    if (!newTaskName.trim()) return;
    const updatedBoards = boards.map((board, index) =>
      index === boardIndex
        ? {
            ...board,
            tasks: board.tasks.map((task, tIndex) =>
              tIndex === taskIndex
                ? { ...task, name: newTaskName, editable: false }
                : task
            ),
          }
        : board
    );
    setBoards(updatedBoards);
  };

  
  const handleDragStart = (boardIndex, taskIndex) => {
    setDraggedTask({ boardIndex, taskIndex });
  };

  const handleDrop = (boardIndex) => {
    if (!draggedTask) return;
    const { boardIndex: fromBoardIndex, taskIndex } = draggedTask;
    const taskToMove = boards[fromBoardIndex].tasks[taskIndex];

    const updatedBoards = boards.map((board, index) => {
      if (index === fromBoardIndex) {
        
        return {
          ...board,
          tasks: board.tasks.filter((_, tIndex) => tIndex !== taskIndex),
        };
      } else if (index === boardIndex) {
       
        return {
          ...board,
          tasks: [...board.tasks, taskToMove],
        };
      }
      return board;
    });

    setBoards(updatedBoards);
    setDraggedTask(null); 
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  
  const goToProfile = () => {
    navigate("/MyProfile");
  };



  return (
    <div className="app">
      <div className="upp">
      {/* Profile Button */}
      <div className="profile-button">
        <button onClick={goToProfile}>Profile</button>
      </div>

      <header className="mainheader">
        <h1>Board and Task Manager</h1>
      </header>

      <div className="board-creation">
        <input
          type="text"
          placeholder="Enter board name..."
          value={boardInput}
          onChange={(e) => setBoardInput(e.target.value)}
        />
        <button onClick={addBoard}>Add Board</button>
      </div>  
      </div>


      <div className="boards">
        {boards.map((board, boardIndex) => (
          <div
            className="board"
            key={boardIndex}
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(boardIndex)}
          >
            <div className="board-header">
              <h3>{board.name}</h3>
              <button
                className="deleteboardbtn"
                onClick={() => deleteBoard(boardIndex)}
              >
                Delete Board
              </button>
            </div>
            
            <TaskInput
              onAddTask={(taskName) => addTask(boardIndex, taskName)}  // aa function Taskinput ne kai de she k kai rite add krvu, friend 
            />
            <ul className="tasks">
              {board.tasks.map((task, taskIndex) => (
                <li
                  key={taskIndex}
                  className="task"
                  draggable
                  onDragStart={() => handleDragStart(boardIndex, taskIndex)}
                >
                  {task.editable ? (
                    <input
                      type="text"
                      defaultValue={task.name}
                      onBlur={(e) =>
                        updateTask(boardIndex, taskIndex, e.target.value)   // onBlue function will automatical save update value when you updatind and point some where 
                      }
                    />
                  ) : (
                    <span>{task.name}</span>
                  )}
                  <div className="task-buttons">
                    <button
                      onClick={() => toggleEditTask(boardIndex, taskIndex)}
                    >
                      {task.editable ? "Save" : "Edit"}
                    </button>
                    <button onClick={() => deleteTask(boardIndex, taskIndex)}>
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

const TaskInput = ({ onAddTask }) => {
  const [taskInput, setTaskInput] = useState("");

  const handleAddTask = () => {
    onAddTask(taskInput);
    setTaskInput("");
  };

  return (
    <div>
      <input
        className="addtaskfild"
        type="text"
        placeholder="Add a new task..."
        value={taskInput}
        onChange={(e) => setTaskInput(e.target.value)}
      />
      <button className="addtaskboardbtn" onClick={handleAddTask}>
        Add Task
      </button>
    </div>
  );
};

export default Home;
