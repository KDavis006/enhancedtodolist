import React, { useReducer, useRef, useState, useEffect } from 'react';



const reducer = (state, action) => {
  switch (action.type) {
    case 'create_Item': {
      return
    }
    case 'update_Item': {
      return
    }
    case 'delete_Item': {
      return
    }
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const taskInputRef = useRef(null);
  const categoryInputRef = useRef(null);

  // Initial state with tasks and categories
  const initialState = {
    tasks: [],
    categories: [],
  };

  // UseEffect to persist data to local storage
  useEffect(() => {
    localStorage.setItem('todoState', JSON.stringify(state));
  }, [state]);

  // Function to add a task
  const addTask = () => {
    const taskName = taskInputRef.current.value;
    const category = categoryInputRef.current.value;

    // Validate task and category
    if (!taskName || !category) {
      alert('Please enter task and category.');
      return;
    }

    // Dispatch action to add task
    dispatch({ type: 'ADD_TASK', payload: { taskName, category } });
  };

  // More functions for handling actions related to tasks and categories
  // ...

  return (
    <div>
      <h1>Todo List</h1>

      {/* Task Input */}
      <input type="text" ref={taskInputRef} placeholder="Enter task" />

      {/* Category Input */}
      <input type="text" ref={categoryInputRef} placeholder="Enter category" />

      {/* Add Task Button */}
      <button onClick={addTask}>Add Task</button>

      {/* Display Tasks and Categories */}
      {/* ... */}

      {/* Other UI elements for managing categories, sorting, etc. */}
      {/* ... */}

    </div>
  );
};

export default TodoList;
