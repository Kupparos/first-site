import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PostService from "../API/PostService";
import Loader from "../Components/UI/Loader/Loader";
import { useFetch } from "../Hooks/useFetch";

export default function PostIdPage() {
  const params = useParams();
  const [post, setPost] = useState([]);
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetch(async (id) => {
    const response = await PostService.getById(id);
    setPost(response);
  });

  const [fetchComments, ComLoading, comError] = useFetch(async (id) => {
    const response = await PostService.getCommentById(id);
    setComments(response);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div>
      <h1>Post page number {params.id} here!</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          {post.id}. {post.title}
        </div>
      )}
      <h1>Comments:</h1>
      {ComLoading ? (
        <Loader />
      ) : (
        <div>
          {comments.map((comm) => (
            <div key={comm.id} style={{ margin: "15px 15px" }}>
              <h5>{comm.email}</h5>
              <div>{comm.body}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
