import React, { useContext } from "react";
import MyButton from "../UI/Button/MyButton";
import { Link } from "react-router-dom";
import { AuthContext } from "../Context";

export default function Navbar() {
  const { isAuth, setIsAuth } = useContext(AuthContext);

  function logout() {
    setIsAuth(false)
    localStorage.removeItem('auth')
  }

  return (
    <div className="navbar">
      <MyButton onClick={logout}>Exite</MyButton>
      <nav className="navbar__links">
        <MyButton>
          <Link to="/about">About</Link>
        </MyButton>
        <MyButton>
          <Link to="/posts">Posts</Link>
        </MyButton>
      </nav>
    </div>
  );
}
