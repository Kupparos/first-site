import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "../Pages/Login";
import Posts from "../Pages/Posts";
import { AuthContext } from "./Context";
import { publicRoutes, privateRoutes } from "./Router/routes";
import Loader from "./UI/Loader/Loader";

export default function AppRouter() {
  const { isAuth, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return <Loader/>
  }

  return isAuth ? (
    <Routes>
      {privateRoutes.map((route, index) => (
        <Route
          key={index}
          element={route.component}
          path={route.path}
          end={route.exact}
        />
      ))}
      <Route path="*" element={<Posts />} />
    </Routes>
  ) : (
    <Routes>
      {publicRoutes.map((route, index) => (
        <Route
          key={index}
          element={route.component}
          path={route.path}
          end={route.exact}
        />
      ))}
      <Route path="*" element={<Login />} />
    </Routes>
  );
}
