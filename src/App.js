import "./Styles/App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import AppRouter from "./Components/AppRouter";
import { AuthContext } from "./Components/Context";

function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setLoading] = useState(true)

  useEffect(() => {
    if(localStorage.getItem('auth')) {
      setIsAuth(true)
    }
      setLoading(false)
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuth,
        setIsAuth,
        isLoading,
      }}
    >
      <BrowserRouter>
        <Navbar />
        <AppRouter />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
