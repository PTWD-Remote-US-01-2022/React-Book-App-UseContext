import { useState, useContext } from 'react';
import UserContext from '../contexts/UserContext';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const {setUser } = useContext(UserContext);
  const navigateTo = useNavigate();

  const [userName, setUserName] = useState('');

  const changeHandler = (e) => {
    setUserName(() => e.target.value);
  };
  const submitHandler = (e) => {
    setUser(() => userName);
    navigateTo('/');
  };

  return (
    <div>
      <h1>Login</h1>

      <p>Please enter your username</p>
      <input
        type="text"
        name="userName"
        onChange={changeHandler}
        value={userName}
      />
      <button onClick={submitHandler}>Submit</button>
    </div>
  );
};
export default Login;
