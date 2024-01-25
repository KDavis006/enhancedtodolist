import { useState } from 'react';

const CategoryList = ({ categories, dispatch }) => {
  const [newCategory, setNewCategory] = useState('');

  const handleAddCategory = () => {
    if (newCategory) {
      dispatch({ type: 'ADD_CATEGORY', payload: { name: newCategory, id: Date.now() } });
      setNewCategory('');
    } else {
      alert('Please enter a valid category name.');
    }
  };

  return (
    <div>
      <h2>Category Management</h2>
      {categories.map(category => (
        <div key={category.id}>
          <span>{category.name}</span>
          <button onClick={() => dispatch({ type: 'UPDATE_CATEGORY', payload: { id: category.id, updatedCategory: prompt('Enter updated category name:') } })}>
            Edit
          </button>
          <button onClick={() => dispatch({ type: 'REMOVE_CATEGORY', payload: category.id })}>Remove</button>
        </div>
      ))}
      <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}placeholder="New Category"
      />
      <button onClick={handleAddCategory}>Add Category</button>
    </div>
  );
};

export default CategoryList;
