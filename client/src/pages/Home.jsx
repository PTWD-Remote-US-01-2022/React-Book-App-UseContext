import { useContext } from 'react';
import UserContext from '../contexts/UserContext';

const Home = () => {
  const { user } = useContext(UserContext);

  return (
    <div>
      <h1>{user ? `Welcome ${user}!!!!` : 'Book App!!!'}</h1>
    </div>
  );
};
export default Home;
