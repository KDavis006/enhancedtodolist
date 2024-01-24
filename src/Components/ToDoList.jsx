import React, { useReducer, useEffect, useState } from 'react';

// Initial state
let initialState = {
  tasks: [
    { id: 1, name: 'Task 1', category: 'Category 1', priority: '3', dueDate: '2023-01-01' },
    { id: 2, name: 'Task 2', category: 'Category 2', priority: '1', dueDate: '2023-02-01' },
  ],
  categories: ['Category 1', 'Category 2'],
  filter: '',
  sort: 'name',
};

// Reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK': {
      return { ...state, tasks: [...state.tasks, action.payload] };
    }
    case 'REMOVE_TASK': {
      return { ...state, tasks: state.tasks.filter((task) => task.id !== action.payload) };
    }
    case 'UPDATE_TASK': {
      return { ...state, tasks: state.tasks.map((task) => (task.id === action.payload.id ? action.payload : task)) };
    }
    case 'ADD_CATEGORY': {
      return { ...state, categories: [...state.categories, action.payload] };
    }
    case 'REMOVE_CATEGORY': {
      return { ...state, categories: state.categories.filter((_, index) => index !== action.payload) };
    }
    case 'UPDATE_CATEGORY': {
      return { ...state, categories: state.categories.map((category, index) => (index === action.payload.index ? action.payload.category : category)) };
    }
    case 'SET_FILTER': {
      return { ...state, filter: action.payload };
    }
    case 'SET_SORT': {
      return { ...state, sort: action.payload };
    }
    default:
      return state;
  }
};

const TodoList = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const [newTask, setNewTask] = useState({ name: '', category: '', priority: '', dueDate: '' })

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    const savedState = localStorage.getItem('todoList');
    if (savedState) {
      dispatch({ type: 'LOAD_STATE', payload: JSON.parse(savedState) });
    }
  }, []);

  const filteredTasks = state.tasks.filter((task) => task.name.toLowerCase().includes(state.filter.toLowerCase()));
  const sortedTasks = filteredTasks.sort((a, b) => {
    if(state.sort === 'name') {
       a.name.localeCompare(b.name) 
    } else if(state.sort === 'dueDate'){
      return new Date(a.dueDate) - new Date(b.dueDate)
    } else {
      return a.priority - b.priority
    }
  });

  return (
    <div>
      <h1>Todo List</h1>
      {/* Category management */}
      <div>
        <h2>Categories</h2>
        <button onClick={() => dispatch({ type: 'ADD_CATEGORY', payload: 'New Category' })}>Add Category</button>
        <ul>
          {state.categories.map((category, index) => (
            <div key={index}>
              <input type="text" placeholder={category} onChange={(e) => dispatch({type: 'UPDATE_CATEGORY', payload: e.target.value})}/>
              <button onClick={() => dispatch({type: 'REMOVE_CATEGORY', payload: index})}>Remove Category</button>
            </div>
          ))}
        </ul>
      </div>

      {/* Task listing */}
      <div>
        <h2>Tasks</h2>
        <input type="text" value={state.filter} onChange={(e) => dispatch({ type: 'SET_FILTER', payload: e.target.value })} placeholder="Search tasks..."
        />
        <select value={state.sort} onChange={(e) => dispatch({ type: 'SET_SORT', payload: e.target.value })}>
          <option value="name">Name</option>
          <option value="dueDate">Due Date</option>
          <option value="priority">Priority</option>
        </select>
        <ul>
          {sortedTasks.map((task) => (
            <li key={task.id}>
              <input type="text" placeholder={task.name} onChange={(e) => dispatch({ type: 'UPDATE_TASK', payload: e.target.value })}
              />
              <input type="text" placeholder={task.category} onChange={(e) => dispatch({ type: 'UPDATE_TASK', payload: e.target.value })}
              />
              <input type="text" placeholder={task.priority} onChange={(e) => dispatch({ type: 'UPDATE_TASK', payload: e.target.value })}
              />
              <input type="date" placeholder={task.dueDate} onChange={(e) => dispatch({ type: 'UPDATE_TASK', payload: e.target.value })}
              />
              <button onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}>Remove Task</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Add Task */}
      <div>
        <h2>Add Task</h2>
        <form onSubmit={(e) => {e.preventDefault(); dispatch({ type: 'ADD_TASK', payload: newTask})}}>
          <input type="text" placeholder="Task name" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })}
          />
          <input type="text" placeholder="Category" value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
          />
          <input type="number" placeholder="Priority" value={newTask.priority} onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
          />
          <input type="date" value={newTask.dueDate} onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
          />
          <button type="submit">Add Task</button>
        </form>
      </div>
    </div>
  );
};

export default TodoList;