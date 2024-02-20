import { useEffect, useState } from "react";
import "./App.css";
import api from "./api/api";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import Posts from "./components/Posts";
import { PostType } from "./types/PostTypes";

export default function App() {
  const [posts, setPosts] = useState<PostType[] | []>([]);
  const [post, setPost] = useState<PostType | null>(null); // post I am editing
  const [error, setError] = useState<string | null>(null);

  const handleAddPost = async (newPost: { title: string; body: string }) => {
    try {
      const id = posts.length ? Number(posts[posts.length - 1].id) + 1 : 1;

      const newPostData = {
        id: id.toString(),
        ...newPost,
      };
      const response = await api.post(`/posts`, newPostData);

      setPosts([...posts, response.data]);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      try {
        await api.delete(`/posts/${postId}`);
        const newPosts = posts.filter((post: PostType) => post.id !== postId);
        setPosts(newPosts);
      } catch (err) {
        setError(err.message);
      }
    } else {
      console("You chose not to delete the post!");
    }
  };

  const handleEditPost = async (updatedPost) => {
    try {
      const response = await api.patch(`/posts/${updatedPost.id}`, updatedPost);

      const updatedPosts = posts.map((post) =>
        post.id === response.data.id ? response?.data : post
      );
      setPosts(updatedPosts);
    } catch (err) {
      setError(err.message);
    }
  };

  // ---> fetch data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get("/posts");
        if (response && response?.data) {
          setPosts(response?.data);
        }
      } catch (err) {
        setError(err.message);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <h1>Learn API Request with Axios</h1>
        <hr />

        <div>
          <Posts
            posts={posts}
            onDeletePost={handleDeletePost}
            onEditClick={setPost}
          />

          <hr />

          {!post ? (
            <AddPost onAddPost={handleAddPost} />
          ) : (
            <EditPost post={post} onEditPost={handleEditPost} />
          )}
        </div>

        {error && (
          <>
            <hr />
            <div className="error">{error}</div>
          </>
        )}
      </div>
    </div>
  );
}
