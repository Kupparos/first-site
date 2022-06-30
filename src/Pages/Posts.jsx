import "../Styles/App.css";
import React, { useState, useEffect, useRef } from "react";
import PostList from "../Components/PostList";
import PostForm from "../Components/PostForm";
import PostFilter from "../Components/PostFilter";
import MyModal from "../Components/UI/Modal/MyModal";
import MyButton from "../Components/UI/Button/MyButton";
import { usePosts } from "../Hooks/usePosts";
import PostService from "../API/PostService";
import Loader from "../Components/UI/Loader/Loader";
import { useFetch } from "../Hooks/useFetch";
import { getPagesCount } from "../Components/Utils/pages";
import Pagination from "../Components/Pagination/Pagination";
import useObserver from "../Hooks/useObserver";
import MySelect from "../Components/UI/Select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const [totalePages, setTotalePages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const lastElement = useRef();

  const [fetchPosts, loading, error] = useFetch(async (limit, page) => {
    const data = await PostService.getAll(page, limit);
    const newPosts = [...(page !== 1 ? posts : []), ...data];
    setPosts(newPosts);
    const totaleCount = await PostService.getCount();
    setTotalePages(getPagesCount(totaleCount, limit));
  });

  useObserver(lastElement, loading, page < totalePages, () => {
    setPage((page) => page + 1);
  });

  useEffect(() => {
    fetchPosts(limit, page);
  }, [page, limit]);

  async function createPost(newPost) {
    await PostService.addPost(newPost);
    fetchPosts(limit, page);
    setModal(false);
  }

  async function removePost(post) {
    await PostService.removePost(post.id);
    fetchPosts(limit, page);
  }

  function changePage(page) {
    setPage(page);
  }

  function applyLimit(value) {
    setPage(1);
    setLimit(Number(value));
  }

  return (
    <div className="App">
      <MyButton style={{ marginTop: "15px" }} onClick={() => setModal(true)}>
        Create post
      </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} posts={posts} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={applyLimit}
        defaultValue="Elements amount"
        option={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "All" },
        ]}
      />
      {error && <h1>Error: ${error}</h1>}
      <PostList
        posts={sortedAndSearchedPosts}
        title="Posts list"
        remove={removePost}
      />
      {limit !== -1 && (
        <>
          <div ref={lastElement} style={{ height: "2px" }} />
          {loading && <Loader />}
          <Pagination
            totalePages={totalePages}
            page={page}
            changePage={changePage}
          />
        </>
      )}
    </div>
  );
}

export default Posts;
