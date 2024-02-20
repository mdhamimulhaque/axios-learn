import { useState } from "react";
import "./App.css";
import AddPost from "./components/AddPost";
import EditPost from "./components/EditPost";
import Posts from "./components/Posts";
import { PostType } from "./types/PostTypes";

export default function App() {
  const [posts, setPosts] = useState<PostType[] | []>([]);
  const [post, setPost] = useState<PostType | null>(null); // post I am editing

  const handleAddPost = (newPost) => {
    const id = posts.length ? posts[posts.length - 1].id + 1 : 1;

    setPosts([
      ...posts,
      {
        id,
        ...newPost,
      },
    ]);
  };

  const handleDeletePost = (postId) => {
    if (confirm("Are you sure you want to delete the post?")) {
      const newPosts = posts.filter((post: PostType) => post.id !== postId);
      setPosts(newPosts);
    } else {
      console("You chose not to delete the post!");
    }
  };

  const handleEditPost = (updatedPost) => {
    const updatedPosts = posts.map((post: PostType) =>
      post.id === updatedPost.id ? updatedPost : post
    );

    setPosts(updatedPosts);
  };

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
      </div>
    </div>
  );
}
