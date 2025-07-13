import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SmartAuthentication from "./components/SmartAuthentication";
import AdminPanel from "./components/AdminPannel.jsx";
import Dashboard from "./components/Dashboard.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import withAuth from "./utils/withAuth.jsx";
import LandingPage from "./components/landing.jsx";
import "./App.css";

// Wrap protected routes
const ProtectedDashboard = withAuth(Dashboard);
const ProtectedAdminPanel = withAuth(AdminPanel);

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<SmartAuthentication />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
            <Route path="/adminPannel" element={<ProtectedAdminPanel />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
