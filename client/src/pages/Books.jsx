import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    const { data } = await axios.get(`http://localhost:5005/books`);
    setBooks(() => data);
  };

  useEffect(() => {
    try {
      getBooks();
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <div>
      <h1>Books List</h1>

      {books.map((book) => {
        return (
          <div>
            <p>
              <Link to={book._id}>{book.title}</Link>
            </p>
          </div>
        );
      })}
    </div>
  );
};
export default Books;
