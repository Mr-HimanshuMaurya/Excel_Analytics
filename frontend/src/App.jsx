import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LandingPage from "./components/landing.jsx";
import Authentication from "./components/authentication.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import "./App.css";
import AdminPanel from "./components/AdminPannel.jsx";
import Dashboard from "./components/Dashboard.jsx"
function App() {
  // const isAuthenticated = true; //!!localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Routes>
          
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
