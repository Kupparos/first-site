import React from "react";
import MyButton from "./UI/Button/MyButton";
import "../Styles/App.css";
import { useNavigate } from "react-router-dom";

export default function PostItem(props) {
  
  const router = useNavigate()

  return (
    <div className="post">
      <div className="post__content">
        <strong>
          {props.post.id}. {props.post.title}
        </strong>
        <div>{props.post.body}</div>
      </div>
      <div className="post__btns">
        <MyButton onClick={() => router(`/posts/${props.post.id}`)}>Open</MyButton>
        <MyButton onClick={() => props.remove(props.post)}>Delete</MyButton>
      </div>
    </div>
  );
}
