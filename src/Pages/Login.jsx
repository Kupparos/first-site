import React, { useContext, useState } from "react";
import MyButton from "../Components/UI/Button/MyButton";
import MyInput from "../Components/UI/Input/MyInput";
import { AuthContext } from "../Components/Context";

export default function Login() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  function toLogin(e) {
    e.preventDefault();
    if (login.match(/[-.\w]+@([\w-]+\.)+[\w-]+/g) && password.length > 5) {
      setIsAuth(true);
    } else alert("Wrong password or login");
    localStorage.setItem('auth', 'true')
  }
  return (
    <div>
      <h1>Login, please</h1>
      <form onSubmit={toLogin}>
        <MyInput
          type="text"
          placeholder="Enter login"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
        <MyInput
          type="password"
          placeholder="Enter password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <MyButton>Enter</MyButton>
      </form>
    </div>
  );
}
