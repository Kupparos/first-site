import axios from "axios";

class Storage {
  constructor() {
    this.ready = axios
      .get("https://jsonplaceholder.typicode.com/posts", {
        params: {
          _limit: 100,
          _page: 1,
        },
      })
      .then(({ data }) => {
        this.posts = data;
      });
  }
  getCount = () => this.posts.length;
  addPost = (post) => {
    const id = this.posts.length + 1;
    this.posts.push({ ...post, id });
    return this.getCount();
  };
  getPage = (page, limit) => limit === -1 ? this.posts : this.posts.slice((page - 1) * limit, page * limit);
  removePost = (removedId) =>
    (this.posts = this.posts.filter(({ id }) => id !== removedId));
  getById = (id) => axios.get("https://jsonplaceholder.typicode.com/posts/" + id).then(({data}) => data);
  getCommentById = (id) => axios.get(`https://jsonplaceholder.typicode.com/posts/${id}/comments`).then(({data}) => data);
}

const store = new Storage();

export default class PostService {
  static async getAll(page = 1, limit = 10) {
    await store.ready;
    console.log(page, limit, store.posts.length, store.getPage(page, limit).length)
    return store.getPage(page, limit);
  }
  static async getCount() {
    await store.ready;
    return store.getCount();
  }
  static async addPost(post) {
    await store.ready;
    return store.addPost(post);
  }
  static async removePost(id) {
    await store.ready;
    return store.removePost(id);
  }
  static async getById(id) {
    await store.ready;
    return store.getById(id);
  }
  static async getCommentById(id) {
    await store.ready;
    return store.getCommentById(id);
  }
}
