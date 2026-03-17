import useAuthStore, {
  selectIsAdmin,
  selectUserData,
} from "@/store/useAuthStore";
import { Post } from "../../../types";
import "./PostCard.css";

interface PostCardProps {
  post: Post;
  onEdit: (post: Post) => void;
  onDelete: (id: string) => void;
}

const PostCard = ({ post, onEdit, onDelete }: PostCardProps) => {
  console.log("card ----- " + post.id)
  
  const user = useAuthStore(selectUserData);
  const isAdmin = useAuthStore(selectIsAdmin);
  const canEdit = user?.id === post.authorId || isAdmin;


  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div>
          <h3 className="post-title">{post.title}</h3>
          <p className="post-meta">
            By {post.authorName || "Unknown"} • {formatDate(post.createdAt)}
            {post.updatedAt !== post.createdAt && " • Edited"}
          </p>
        </div>
        {canEdit && (
          <div className="post-actions">
            <button
              onClick={() => onEdit(post)}
              className="btn-icon btn-edit"
              title="Edit post"
            >
              ✏️
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="btn-icon btn-delete"
              title="Delete post"
            >
              🗑️
            </button>
          </div>
        )}
      </div>
      <div className="post-content">{post.content}</div>
    </div>
  );
};

export default PostCard;
