import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import LikeContext from '../contexts/LikeContext';
const styles = {
  display: 'flex',
  justifyContent: 'space-around',
};

const activeStyle = ({ isActive }) => {
  return { color: isActive ? 'Red' : 'Green' };
};

const NavBar = () => {
  const { likes } = useContext(LikeContext);
  return (
    <>
      <div style={styles}>
        <NavLink to="/" style={activeStyle}>
          Home
        </NavLink>
        <NavLink to="login" style={activeStyle}>
          Login
        </NavLink>
        <NavLink to="books" style={activeStyle}>
          Books
        </NavLink>
        <NavLink to="addbook" style={activeStyle}>
          Add a Book
        </NavLink>
        <div>Total Like: {likes.length}</div>
      </div>
      <hr />
    </>
  );
};
export default NavBar;
