import { createContext, useState, useEffect } from 'react';

const LikeContext = createContext();

export const LikeProvider = ({ children }) => {
  const [likes, setLikes] = useState(
    JSON.parse(localStorage.getItem('likes')) || []
  );

    //store the likes(liked books id) in the local storage
  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  const uniqueLikes = (bookId) => {
    if (!likes.includes(bookId))
      setLikes((prevLikes) => [...prevLikes, bookId]);
  };

  const updateLikedBooks = (likeState, bookId) => {
    likeState
      ? uniqueLikes(bookId)
      : setLikes((prevLikes) => prevLikes.filter((id) => id !== bookId));
  };
  return (
    <LikeContext.Provider value={{ likes, updateLikedBooks }}>
      {children}
    </LikeContext.Provider>
  );
};

export default LikeContext;
