import { Post } from "../../../types";
import PostCard from "./PostCard";
import "./PostList.css";

interface PostListProps {
  posts: Post[];
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostList = ({ posts, onEdit, onDelete }: PostListProps) => {
  console.log("posts list---------");
  
  if (posts.length === 0) {
    return (
      <div className="post-list-empty">
        <p>No posts yet. Create your first post!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
};

export default PostList;
