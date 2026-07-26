import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";
const UserContext = React.createContext();

const UserProvider = ({ children }) => {
  // User is the name of the "data" that gets stored in context

  const userDataDefault = {
    isAuthenticated: false,
    token: "",
    account: {},
    isLoading: true,
  };
  const [user, setUser] = useState(userDataDefault);

  // Login updates the user data with a name parameter
  const loginContext = (userData) => {
    setUser({ ...userData, isLoading: false });
  };

  // Logout updates the user data to default
  const logout = () => {
    setUser((user) => ({
      name: "",
      auth: false,
    }));
  };

  const fetchUser = async () => {
    let response = await getUserAccount();
    if (response && response.EC === 0) {
      let token = response.DT.access_token;
      let groups = response.DT.Group;
      let email = response.DT.email;
      let username = response.DT.username;

      let data = {
        isAuthenticated: true,
        token: token,
        account: {
          groups,
          email,
          username,
        },
        isLoading: false,
      };
      setUser(data);
    } else {
      setUser({ ...userDataDefault, isLoading: false });
    }
  };

  useEffect(() => {
    if (
      window.location.pathname !== "/" ||
      window.location.pathname !== "/login"
    ) {
      fetchUser();
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, loginContext, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
