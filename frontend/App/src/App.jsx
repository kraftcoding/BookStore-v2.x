import { useState, useEffect } from 'react';
import { getItems, createItem } from './api';
import './App.css';

function App() {
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [value, setValue] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    try {
      const data = await getItems();
      setItems(data);
    } catch (err) {
      console.error('Failed to load items');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createItem({ name, value: parseInt(value) });
    setName(''); setValue('');
    loadItems();
  };

  return (
    <div className="App">
      <h1>Full Stack Application</h1>
      <form onSubmit={handleSubmit}>
        <input value={name} onChange={e => setName(e.target.value)} placeholder="Name" required />
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="Value" required />
        <button type="submit">Add Item</button>
      </form>
      <ul>
        {items.map(item => (
          <li key={item.id}>{item.name}: {item.value}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;