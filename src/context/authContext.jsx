import { createContext, useState } from "react";

export const AuthContext = createContext({
  user: {
    displayName: "",
    photoURL: "",
    uid:""
  },
  setUser: () => {},
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState({
    displayName: "",
    photoURL: "",
    uid:""
  });

  return (
    <>
      <AuthContext.Provider
        value={{
          user,
          setUser,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
