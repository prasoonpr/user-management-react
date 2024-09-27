import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import RegistrationPage from "./pages/userPages/RegistrationPage";
import LoginPage from "./pages/userPages/LoginPage";
import HomePage from "./pages/userPages/HomePage";
import EditProfilePage from "./pages/userPages/EditProfilePage";
import AdminLoginPage from "./pages/adminPages/AdminLoginPage";
import DashbordPage from "./pages/adminPages/DashbordPage";
import RequireAuthLogin from "./store/protect/RequireAuthLogin";
import RequireAuth from "./store/protect/RequireAuth";
import RequireAdminAuth from "./store/protect/RequireAdminAuth";
import RequireAdminLogin from "./store/protect/RequireAdminLogin";
function AppLayout() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <RequireAuthLogin>
            <RegistrationPage />
          </RequireAuthLogin>
        }
      />

      <Route
        path="/login"
        element={
          <RequireAuthLogin>
            <LoginPage />
          </RequireAuthLogin>
        }
      />

      <Route
        path="/home"
        element={
          <RequireAuth>
            <HomePage />
          </RequireAuth>
        }
      />

      <Route
        path="/edit-profile"
        element={
          <RequireAuth>
            <EditProfilePage />
          </RequireAuth>
        }
      />
      <Route path="/admin/login"
       element={
        <RequireAdminLogin>
          <AdminLoginPage />
        </RequireAdminLogin>
       } />
      <Route
        path="/admin/dashbord"
        element={
          <RequireAdminAuth>
            <DashbordPage />
          </RequireAdminAuth>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
