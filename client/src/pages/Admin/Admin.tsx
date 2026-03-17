import { Link } from "react-router-dom";
import "./Admin.css";
import useAuthStore, { selectUserData } from "../../store/useAuthStore";

const Admin = () => {
  const user = useAuthStore(selectUserData);

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Admin Panel</h1>
        <p className="admin-subtitle">Administrator Dashboard</p>
      </div>

      <div className="admin-content">
        <div className="admin-card">
          <h2>🔐 Admin Access</h2>
          <p>Welcome, {user?.name}. You have administrator privileges.</p>
        </div>

        <div className="admin-card">
          <h2>Admin Features</h2>
          <ul className="admin-features-list">
            <li>Manage all posts (view, edit, delete any post)</li>
            <li>View and manage user accounts</li>
            <li>Access system settings</li>
            <li>View analytics and reports</li>
            <li>Moderate content</li>
          </ul>
        </div>

        <div className="admin-card">
          <h2>Quick Actions</h2>
          <div className="admin-actions">
            <Link to="/posts" className="admin-action-link">
              📝 Manage Posts
            </Link>
            <Link to="/dashboard" className="admin-action-link">
              🏠 Dashboard
            </Link>
            <Link to="/profile" className="admin-action-link">
              👤 Profile
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
