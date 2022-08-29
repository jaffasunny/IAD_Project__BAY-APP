import { createContext, useState } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));

  return (
    <UserContext.Provider value={token}>
      <UserDispatchContext.Provider value={setToken}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext, UserDispatchContext };
