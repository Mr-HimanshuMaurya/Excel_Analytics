import React, { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const fadeInDown = {
  initial: { opacity: 0, y: -20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5, delay: 0.2 },
};

const ActionButton = ({ onClick, color, children }) => {
  const colorClasses = {
    blue: "bg-blue-500 hover:bg-blue-600",
    green: "bg-green-500 hover:bg-green-600",
    red: "bg-red-500 hover:bg-red-600",
  };

  return (
    <button
      onClick={onClick}
      className={`px-8 py-3 ${colorClasses[color]} text-white rounded-lg text-lg font-medium transition-colors duration-300 shadow-md`}
    >
      {children}
    </button>
  );
};

const FeatureCard = ({ title, description, color }) => {
  const colorClasses = {
    blue: "bg-blue-50 border-blue-100 text-blue-700",
    green: "bg-green-50 border-green-100 text-green-700",
    purple: "bg-purple-50 border-purple-100 text-purple-700",
  };

  const textColor = colorClasses[color].split(" ")[2];

  return (
    <div
      className={`${colorClasses[color]
        .split(" ")
        .slice(0, 2)
        .join(" ")} p-6 rounded-lg border`}
    >
      <h3 className={`text-xl font-medium ${textColor} mb-2`}>{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

const Dashboard = React.memo(() => {
  const navigate = useNavigate();
  const isAuthenticated = useMemo(() => !!localStorage.getItem("token"), []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigation = (path) => {
    navigate(path);
  };

  const features = [
    {
      title: "Upload Files",
      description: "Upload your Excel files for analysis",
      color: "blue",
    },
    {
      title: "Analyze Data",
      description: "Get insights from your data",
      color: "green",
    },
    {
      title: "Generate Reports",
      description: "Create beautiful reports from your analysis",
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 font-poppins">
      <header className="fixed top-0 left-0 right-0 bg-white shadow-lg z-10 border-b border-gray-200">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <motion.h1
            className="text-3xl md:text-5xl font-bold text-blue-600 font-playfair tracking-wide"
            {...fadeInDown}
          >
            Excel Analytics
          </motion.h1>

          <div className="flex gap-4">
            {isAuthenticated ? (
              <ActionButton onClick={handleLogout} color="red">
                Logout
              </ActionButton>
            ) : (
              <>
                <ActionButton
                  onClick={() => handleNavigation("/login")}
                  color="blue"
                >
                  Login
                </ActionButton>
                <ActionButton
                  onClick={() => handleNavigation("/signup")}
                  color="green"
                >
                  Sign Up
                </ActionButton>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 pt-28 pb-16">
        <motion.div
          className="bg-white rounded-xl shadow-lg p-6 md:p-8"
          {...fadeInUp}
        >
          <h2 className="text-2xl font-semibold mb-4">
            Welcome to Excel Analytics
          </h2>
          <p className="text-gray-600 mb-6">
            Your powerful platform for analyzing Excel data. Upload your files
            and get started with advanced analytics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                title={feature.title}
                description={feature.description}
                color={feature.color}
              />
            ))}
          </div>

          {isAuthenticated && (
            <div className="mt-8 text-center">
              <button
                onClick={() => handleNavigation("/file-upload-alt")}
                className="px-8 py-3 bg-blue-500 text-white rounded-lg text-lg font-medium hover:bg-blue-600 transition-colors duration-300 shadow-md"
              >
                Go to File Upload
              </button>
            </div>
          )}
        </motion.div>
      </main>

      <footer className="bg-gray-800 text-white py-6">
        <div className="container mx-auto px-4 text-center">
          <p>
            © {new Date().getFullYear()} Excel Analytics. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
});

export default Dashboard;
