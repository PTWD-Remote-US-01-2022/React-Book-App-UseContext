import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getBooks = async () => {
    const { data } = await axios.get(`http://localhost:5005/books`);
    setBooks(() => data);
  };

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
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
      <div>
        <p>
          Search:{' '}
          <input type="search" value={searchTerm} onChange={changeHandler} />
        </p>
      </div>
      {books
        .filter((book) =>
          searchTerm.length > 0
            ? book.title
                .toLocaleLowerCase()
                .includes(searchTerm.toLocaleLowerCase())
            : book
        )
        .map((book) => {
          return (
            <div key={book._id}>
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

// books.filter(book=> searchTerm === book.title)
