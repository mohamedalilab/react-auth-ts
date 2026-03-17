import useAuthStore, { selectUserData } from "@/store/useAuthStore";
import "./Profile.css";

const Profile = () => {
  const user = useAuthStore(selectUserData);

  return (
    <div className="profile">
      <div className="profile-header">
        <h1>Profile</h1>
      </div>

      <div className="profile-card">
        <div className="profile-avatar">
          <div className="avatar-circle">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>
        </div>
        <div className="profile-info">
          <div className="info-section">
            <h2>Personal Information</h2>
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">{user?.name}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email:</span>
              <span className="info-value">{user?.email}</span>
            </div>
            <div className="info-item">
              <span className="info-label">User ID:</span>
              <span className="info-value">{user?.id}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Role:</span>
              <span className={`info-value role-badge role-${user?.role}`}>
                {user?.role?.toUpperCase()}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
