import React, { useState } from "react";
import MyButton from "./UI/Button/MyButton";
import MyInput from "./UI/Input/MyInput";

export default function PostForm({ create }) {
  const [post, setPost] = useState({ title: "", body: "" });

  function addNewPost(e) {
    e.preventDefault();
    const NewPost = {
      ...post,
    };
    create(NewPost);
    setPost({ title: "", body: "" });
  }

  return (
    <form>
      <MyInput
        type="text"
        placeholder="Post name"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <MyInput
        value={post.body}
        onChange={(e) => setPost({ ...post, body: e.target.value })}
        type="text"
        placeholder="Post discription"
      />
      <MyButton onClick={addNewPost}>Create post</MyButton>
    </form>
  );
}
