import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//components
import NavBar from './components/Navbar';

//pages
import Home from './pages/Home';
import Books from './pages/Books';
import AddBook from './pages/AddBook';
import BookDetails from './pages/BookDetails';
import Login from './pages/Login';

//providers
import { UserProvider } from './contexts/UserContext';
import { LikeProvider } from './contexts/LikeContext';

const App = () => {
  return (
    <BrowserRouter>
      {/* Wrapping our entire App here, so that we can use context values anywhere (components, pages) */}
      <UserProvider>
        <LikeProvider>
          <div className="App">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="books" element={<Books />} />
              <Route path="books/:id" element={<BookDetails />} />
              <Route path="addbook" element={<AddBook />} />
              <Route path="login" element={<Login />} />
            </Routes>
          </div>
        </LikeProvider>
      </UserProvider>
    </BrowserRouter>
  );
};

export default App;
