import { PostType } from "./../types/PostTypes";

type Props = {
  posts: PostType[];
  onDeletePost: Function;
  onEditClick: Function;
};

export default function Posts({ posts, onDeletePost, onEditClick }: Props) {
  return (
    <div>
      <h2>All Posts</h2>
      <div>
        <ul>
          {posts.map((post: PostType) => (
            <li key={post.id}>
              <span>{post.id}</span>
              <span>{post.title}</span>
              <div>
                <span onClick={() => onDeletePost(post.id)}>❌</span>
                <span onClick={() => onEditClick(post)}>✏️</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
