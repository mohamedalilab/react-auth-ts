import { Link } from "react-router-dom";
import "./Dashboard.css";
import PageHeader from "@/components/pageHeader";
import InfoRow from "./components/infoRow";
import useAuthStore, {
  selectIsAdmin,
  selectUserData,
} from "@/store/useAuthStore";
import { User } from "@/types";

const Dashboard = (): React.JSX.Element => {
  const user = useAuthStore(selectUserData) as User;
  const isAdmin = useAuthStore(selectIsAdmin);

  return (
    <div className="dashboard">
      <div className="container">
        <PageHeader heading="dashboard" text={`Welcome back, ${user?.name}!`} />
        <div className="dashboard-content grid gap-8 grid-auto-lg">
          <div className="card ">
            <h2 className="card-title">User Information</h2>
            <InfoRow label="Name" value={user.name} />
            <InfoRow label="Email" value={user.email} />
          </div>

          {isAdmin && (
            <div className="card">
              <h2 className="card-title">🔐 Admin Panel</h2>
              <p>
                You have administrator privileges. You can access admin-only
                features.
              </p>
              <ul className="admin-features">
                <li>Manage all posts</li>
                <li>View all users</li>
                <li>System settings</li>
              </ul>
            </div>
          )}

          <div className="card">
            <h2 className="card-title">Quick Actions</h2>
            <div className="quick-actions">
              <Link to="/posts" className="action-link">
                📝 View Posts
              </Link>
              <Link to="/profile" className="action-link">
                👤 Edit Profile
              </Link>
              {isAdmin && (
                <Link to="/admin" className="action-link">
                  ⚙️ Admin Panel
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
