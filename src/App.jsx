import { useReducer, useEffect } from 'react';
import CategoryList from './Components/CategoryList';
import TaskList from './Components/TaskList';

const initialState = {
  tasks: [],
  categories: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK' : {
      return { ...state, tasks: [...state.tasks, action.payload] }
    }
    case 'REMOVE_TASK' : {
      return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload) }
    }
    case 'UPDATE_TASK' : {
      return { ...state, tasks: state.tasks.map(task => task.id === action.payload.id ? { ...task, ...action.payload.updatedTask } : task ) }
    }
    case 'ADD_CATEGORY' : {
      return { ...state, categories: [...state.categories, action.payload] }
    }
    case 'REMOVE_CATEGORY' : {
      return { ...state, categories: state.categories.filter(task => task.id !== action.payload) }
    }
    case 'UPDATE_CATEGORY' : {
      return { ...state, categories: state.categories.map(category => category.id === action.payload.id ? { ...category, ...action.payload.updatedCategory } : category) }
    }
    case 'LOAD_STATE' : {
      return action.payload
    }
    default : {
      return state;
    }
  }
};

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem('todoState'));
    if (storedState) {
      dispatch({ type: 'LOAD_STATE', payload: storedState });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todoState', JSON.stringify(state));
  }, [state]);

  return ( 
    <div>
      <CategoryList categories={state.categories} dispatch={dispatch} />
      <TaskList tasks={state.tasks} categories={state.categories} dispatch={dispatch} />
    </div>
  );
};

export default App;
