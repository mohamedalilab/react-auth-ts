import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import Dashboard from "./pages/Dashboard/Dashboard";
import Posts from "./pages/Posts/Posts";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";
import MainLayouts from "./layouts/mainLayouts/mainLayouts";
import PresistLogin from "./layouts/presistLogin";
import RequireAuth from "./layouts/requireAuth";
import RequireGuest from "./layouts/requireGuest";

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PresistLogin />}>
          <Route path="/" element={<MainLayouts />}>
            <Route index element={<Landing />} />
            <Route element={<RequireGuest />}>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
            <Route element={<RequireAuth />}>
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="posts" element={<Posts />} />
              <Route path="profile" element={<Profile />} />
            </Route>
            <Route element={<RequireAuth requiredRole="admin" />}>
              <Route path="admin" element={<Admin />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
