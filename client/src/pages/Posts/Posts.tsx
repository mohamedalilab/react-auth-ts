import { useState } from "react";
import { Post } from "../../types";
import PostList from "./components/PostList";
import PostForm from "./components/PostForm";
import useAxiosQuery from "../../hooks/useAxiosQuery";
import useAxiosMutation from "../../hooks/useAxiosMutation";
import "./Posts.css";
import { axiosPrivate } from "@/services/api";

const Posts = () => {
  console.log("posts -----------");
  const [showForm, setShowForm] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);

  const {
    data: postsData,
    isLoading,
    error: fetchError,
    refetch,
  } = useAxiosQuery<Post[]>({
    axiosInstance: axiosPrivate,
    url: "/posts",
  });

  const {
    execute: executePostMutation,
    actionLoading: isSaving,
    actionError: saveError,
  } = useAxiosMutation<Post>({
    axiosInstance: axiosPrivate,
  });

  const { execute: executeDelete } = useAxiosMutation<void>({
    axiosInstance: axiosPrivate,
  });

  const posts = postsData ?? [];

  const handleSubmit = async (title: string, content: string, id?: string) => {
    if (id) {
      await executePostMutation({
        method: "PUT",
        url: `/posts/${id}`,
        data: { title, content },
      });
      setEditingPost(null);
    } else {
      await executePostMutation({
        method: "POST",
        url: "/posts",
        data: { title, content },
      });
    }
    refetch();
    setShowForm(false);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this post?")) {
      return;
    }
    try {
      await executeDelete({
        method: "DELETE",
        url: `/posts/${id}`,
      });
      refetch();
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          error.message ||
          "Failed to delete post"
      );
    }
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setShowForm(true);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingPost(null);
  };

  return (
    <div className="posts-page">
      <div className="posts-header">
        <h1>Posts</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn btn-primary"
        >
          {showForm ? "Cancel" : "+ New Post"}
        </button>
      </div>

      {fetchError && <div className="error-message">{fetchError}</div>}

      {showForm && (
        <PostForm
          post={editingPost}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          loading={isSaving}
          error={saveError}
        />
      )}

      {isLoading ? (
        <div className="loading">Loading posts...</div>
      ) : (
        <PostList posts={posts} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default Posts;
