import { useState } from 'react';

const TaskList = ({ tasks, categories, dispatch }) => {
  const [newTask, setNewTask] = useState({ name: '', description: '', category: '' });

  const handleAddTask = () => {
    if (newTask.category && newTask.name) {
      dispatch({ type: 'ADD_TASK', payload: { ...newTask, id: Date.now() } });
      setNewTask({ name: '', description: '', category: '' });
    } else {
      alert('Please enter valid task details.');
    }
  };

  return (
    <div>
      <h2>Task List</h2>
      {tasks.map(task => (
        <div key={task.id}>
          <span>{task.name}</span>
          <span>{task.description}</span>
          <span>{task.category}</span>
          <button onClick={() => dispatch({ type: 'UPDATE_TASK', payload: { id: task.id, updatedTask: prompt('Enter updated task details:') } })}>Edit</button>
          <button onClick={() => dispatch({ type: 'REMOVE_TASK', payload: task.id })}>Remove</button>
        </div>
      ))}
      <input type="text" value={newTask.name} onChange={(e) => setNewTask({ ...newTask, name: e.target.value })} placeholder="Task Name" />
      <input type="text" value={newTask.description} onChange={(e) => setNewTask({ ...newTask, description: e.target.value })} placeholder="Task Description" />
      <select value={newTask.category} onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
      >
        <option value="" disabled>
          Select Category
        </option>
        {categories.map(category => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
};

export default TaskList;
