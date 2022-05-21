import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
//components
import Form from '../components/Form';
//contexts
import LikeContext from '../contexts/LikeContext';
//react icons
import { AiFillLike } from 'react-icons/ai';
import { AiFillDislike } from 'react-icons/ai';

const BookDetails = () => {
  const defaultFormData = {
    title: '',
    description: '',
    rating: 0,
    author: '',
  };
  const [formData, setFormData] = useState(defaultFormData);

  //get id from the url
  const { id } = useParams();

  const [book, setBook] = useState(null);

  const [editToggler, setEditToggler] = useState(false);
  const [likeToggler, setLikeToggler] = useState(false);

  //Getting likes(contains all liked books id) and updateLikedBooks function to add or delete book id
  const { likes, updateLikedBooks } = useContext(LikeContext);

  const navigateTo = useNavigate();

  //getting book detail from database using id
  const getBookDetails = async () => {
    const { data } = await axios.get(`http://localhost:5005/books/${id}`);
    setBook(() => data);
    setFormData(() => data);
  };

  const updateBookDetail = async () => {
    const { data } = await axios.post(
      `http://localhost:5005/books/${id}`,
      formData
    );
    setBook(() => data);
    setEditToggler(() => !editToggler);
  };

  const deleteBook = async () => {
    const { data } = await axios.delete(`http://localhost:5005/books/${id}`);
    navigateTo('/books');
  };

  const likeCheck = () => {
    //we add "book" in the beginning just to make sure when the book state is null, we dont want to execute setLikeToggler function. Basically its a short form of saying -> if(book) {then do something here}
    book && setLikeToggler(() => likes.includes(book._id));
  };

  useEffect(() => {
    likeCheck();
  }, [book]); //<-- book as a dependency means this useEffect will run at the very first time and also whenever the book state get changes.

  useEffect(() => {
    try {
      getBookDetails();
    } catch (error) {}
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const submitHandler = (e) => {
    e.preventDefault();
    try {
      updateBookDetail();
    } catch (error) {
      console.error(error);
    }
  };

  const deleteHandler = () => {
    try {
      deleteBook();
    } catch (error) {
      console.error(error);
    }
  };

  const editHandler = (e) => {
    setEditToggler(() => !editToggler);
  };

  const likeHandler = (e) => {
    setLikeToggler(() => !likeToggler);

    //this function will execute from the LikeContext, we are passing like state and the book id as an argument.
    updateLikedBooks(!likeToggler, book._id);
  };

  return (
    <div>
      <h1>BookDetails</h1>
      {book && !editToggler && (
        <div key={book._id}>
          <p>Title: {book.title}</p>
          <p>Description: {book.description}</p>
          <p>Author: {book.author}</p>
          <p>Rating: {book.rating}</p>
          <button onClick={likeHandler}>
            {likeToggler ? <AiFillDislike /> : <AiFillLike />}
          </button>
          <button onClick={editHandler}>Edit</button>
          <button onClick={deleteHandler}>Delete</button>
        </div>
      )}

      {editToggler && (
        <div>
          <Form
            formData={formData}
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            editHandler={editHandler}
          />
          <button onClick={editHandler}>Cancel</button>
        </div>
      )}
    </div>
  );
};
export default BookDetails;

// author: "J.K. Rowling "
// createdAt: "2022-05-19T23:20:20.448Z"
// description: "Harry Potter is a series of seven fantasy novels written by British author, J. K. Rowling. The novels chronicle the lives of a young wizard, Harry Potter, and his friends Hermione Granger and Ron Weasley, all of whom are students at Hogwarts School of Witchcraft and Wizardry. The main story arc concerns Harry's struggle against Lord Voldemort, a dark wizard who intends to become immortal, overthrow the wizard governing body known as the Ministry of Magic and subjugate all wizards and Muggles (non-magical people)."
// rating: 9
// title: "Harry Potter"
// updatedAt: "2022-05-19T23:20:20.448Z"
// __v: 0
// _id: "6286d0b40aad71810e09849c"
