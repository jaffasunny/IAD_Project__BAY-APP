import { createContext, useState } from "react";

const UserContext = createContext(undefined);
const UserDispatchContext = createContext(undefined);

const UserProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [lat, setLat] = useState([]);
  const [long, setLong] = useState([]);
  const [beachInfo, setBeachInfo] = useState({});

  const [helper, setHelper] = useState(
    localStorage.getItem("helper")
      ? localStorage.getItem("helper") === "true"
        ? true
        : false
      : true
  );

  return (
    <UserContext.Provider value={{ token, lat, long, beachInfo, helper }}>
      <UserDispatchContext.Provider
        value={{ setToken, setLat, setLong, setBeachInfo, setHelper }}>
        {children}
      </UserDispatchContext.Provider>
    </UserContext.Provider>
  );
};
export { UserProvider, UserContext, UserDispatchContext };
