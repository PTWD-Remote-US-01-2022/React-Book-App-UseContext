import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';

import Form from '../components/Form';


const AddBooks = () => {
  const defaultFormData = {
    title: '',
    description: '',
    rating: 0,
    author: '',
  };
  const [formData, setFormData] = useState(defaultFormData);
  const navigateTo = useNavigate();

  const addNewBook = async () => {
    const { data } = await axios.post(
      `http://localhost:5005/books/newbook`,
      formData
    );
    navigateTo('/books');
  };

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    try {
      addNewBook();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Add a new book</h1>
      <Form
        formData={formData}
        submitHandler={submitHandler}
        changeHandler={changeHandler}
      />
    </div>
  );
};
export default AddBooks;

// 1. Add a form
// 2. Make a call to backend to create a new book
// 3. Create a route inside books.route in backend
// 4. navigateTo /books path
