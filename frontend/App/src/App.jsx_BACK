import { useState, useEffect } from 'react';
import { getBooks, createBook } from './api';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [isbn, setIsbn] = useState('');
  const [description, setDescription] = useState('');
  const [author, setAuthor] = useState('');

  useEffect(() => {
    loadBooks();
  }, []);

  const loadBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);
    } catch (err) {
      console.error('Failed to load books');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createBook({ title, isbn, description, author });
    setTitle(''); 
    setIsbn('');
    setDescription('');
    setAuthor('');
    loadBooks();
  };

  return (
    <div className="App">
      <h6>Add book</h6>
      <form onSubmit={handleSubmit}>
       <div> 
        <span>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" required />
        </span><br />
        <span>
          <input value={isbn} onChange={e => setIsbn(e.target.value)} placeholder="ISBN" required />
        </span><br />
        <span>
          <input value={description} onChange={e => setDescription(e.target.value)} placeholder="Description" required />
        </span><br />
        <span>
          <input value={author} onChange={e => setAuthor(e.target.value)} placeholder="Author" required />
        </span><br /><br />
        <span>
          <button type="submit">Add book</button>
        </span>
      </div>
      </form>
      <ul>
        {books.map(book => (
          <li> {book.id} | {book.title} | {book.isbn} | {book.description} | {book.description}</li>
        ))}
      </ul>
      
    </div>
  );
}

export default App;