import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import LikeContext from '../contexts/LikeContext';

const styles = {
  display: 'flex',
  justifyContent: 'space-around',
};

//Key difference between Link and NavLink is to hace access of this "isActive" object.
const activeStyle = ({ isActive }) => {
  return { color: isActive ? 'Red' : 'Green' };
};

const NavBar = () => {
  const { likes } = useContext(LikeContext);
  return (
    // this empty <> calls React fragments
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
