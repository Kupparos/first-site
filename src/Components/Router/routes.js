import About from "../../Pages/About";
import Login from "../../Pages/Login";
import PostIdPage from "../../Pages/PostIdPage";
import Posts from "../../Pages/Posts";

export const privateRoutes = [
  { path: "/about", component: <About/>, exact: true },
  { path: "/posts", component: <Posts/>, exact: true },
  { path: "/posts/:id", component: <PostIdPage/>, exact: true },
];

export const publicRoutes = [
   { path: "/login", component: <Login/>, exact: true },
]
