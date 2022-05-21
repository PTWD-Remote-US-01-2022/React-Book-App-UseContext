import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  return (
    //Whichever states/function we want to use as a global variable(useState), you have to pass it as a value
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserContext;

//To create a context
//1. Create a context.jsx file, add all the necessary boilerplate code and the states
//2. Wrap your App with contexProvider in App.js
//3. Use useContext(contextName) method to get your states values in any components/pages you want.
