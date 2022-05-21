import { createContext, useState } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState([]);

  const uniqueLikes = (bookId) => {
    if (!likes.includes(bookId))
      setLikes((prevLikes) => [...prevLikes, bookId]);
  };

  const updateLikedBooks = (likeState, bookId) => {
    likeState
      ? uniqueLikes(bookId)
      : setLikes((prevLikes) => prevLikes.filter((id) => id !== bookId));
  };
  console.log(likes);
  return (
    <LikeContext.Provider value={{ likes, updateLikedBooks }}>
      {children}
    </LikeContext.Provider>
  );
};

export default LikeContext;
