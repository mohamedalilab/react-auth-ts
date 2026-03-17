import { useState, useEffect, FormEvent } from 'react';
import { Post } from '../../../types';
import './PostForm.css';

interface PostFormProps {
  post?: Post | null;
  onSubmit: (title: string, content: string, id?: string) => Promise<void>;
  onCancel: () => void;
  loading: boolean;
  error?: string | null;
}

const PostForm = ({ post, onSubmit, onCancel, loading, error }: PostFormProps) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');


  console.log("forms -------")

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [post]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await onSubmit(title, content, post?.id);
  };

  return (
    <div className="post-form-container">
      <form onSubmit={handleSubmit} className="post-form">
        <h2>{post ? 'Edit Post' : 'Create New Post'}</h2>
        {error && <div className="form-error">{error}</div>}
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter post title"
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
            disabled={loading}
            placeholder="Enter post content"
            rows={8}
          />
        </div>
        <div className="form-actions">
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : post ? 'Update' : 'Create'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostForm;
