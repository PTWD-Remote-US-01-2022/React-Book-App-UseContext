import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  //Requestiong all the books from our database
  const getBooks = async () => {
    const { data } = await axios.get(`http://localhost:5005/books`);
    setBooks(() => data);
  };

  const changeHandler = (e) => {
    setSearchTerm(e.target.value);
  };

  //This useEffect will execute getbooks function only one time when this page loads
  useEffect(() => {
    try {
      getBooks();
    } catch (error) {
      console.error(error);
    }
  }, []); //<-- No dependency, means it will execute only one time

  return (
    <div>
      <h1>Books List</h1>
      <div>
        <p>
          Search:{' '}
          <input type="search" value={searchTerm} onChange={changeHandler} />
        </p>
      </div>

      {/* Filter method will filter out all other books which dont contain same search terms based on the book title. */}
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
