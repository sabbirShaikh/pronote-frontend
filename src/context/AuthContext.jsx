import { createContext, useState } from "react";

export const AuthContext = createContext();

export default function authConWrapper(props) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  function logout() {
    setToken("");
    localStorage.clear("token")
  }

  return (
    <AuthContext.Provider value={{ token,setToken, logout }}>
      {props.children}
    </AuthContext.Provider>
  );
}
