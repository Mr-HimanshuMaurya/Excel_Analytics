import React from "react"
import "././App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import LandingPage from "./pages/landing.jsx";
import Authentication from "./pages/authentication.jsx";
import { AuthProvider } from "./contexts/AuthContext.jsx";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
        <Routes>         
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<Authentication />} />
        </Routes>
        </AuthProvider>
      </Router>
    </>
  )
}

export default App