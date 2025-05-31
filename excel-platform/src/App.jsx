import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
// import Login from "./components/Login";
// import Signup from "./components/SignUp";
// import Dashboard from "./components/Dashboard";
import LandingPage from "./components/landing.jsx";
import Authentication from "./components/authentication.jsx";
import { AuthProvider } from "./components/AuthContext.jsx";
import "./App.css";
import FileUpload from "./components/FileUpload.jsx";
import AdminPanel from "./components/AdminPannel.jsx";
import Dashboard from "./components/Dashboard.jsx"
function App() {
  // const isAuthenticated = true; //!!localStorage.getItem("token");
  return (
    <div className="App">
      <Router>
        <AuthProvider>
        <Routes>
          {/* <Route
            path="/"
            element={ */}
              {/* // <Navigate to="/login" /> */}
              {/* // element={<Navigate to="/dashboard" /> */}
            {/* } // Always redirect to Login */}
          {/* /> */}
          {/* <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} /> */}
          {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/dashboard" element={<Dashboard/>} />
          {/* <Route
            path="/file-upload"
            element={<FileUpload />}
            // element={
            //   isAuthenticated ? <FileUpload /> : <Navigate to="/dashboard" />
            // }
          /> */}
        </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
