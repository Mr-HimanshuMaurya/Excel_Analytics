import React from "react";
import { useNavigate } from "react-router-dom";
import { User, Clock } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-lg">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-3 cursor-pointer hover:opacity-90 transition-opacity duration-300"
          >
            <span className="text-3xl">📊</span>
            <span className="text-xl sm:text-2xl font-extrabold tracking-wider">
              AnalyticsPro
            </span>
          </div>
          <div className="flex items-center gap-3 sm:gap-5">
            <div
              onClick={() => navigate("/profile")}
              className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base font-medium rounded-md hover:bg-gray-800 hover:text-gray-300 cursor-pointer transition-all duration-300"
            >
              <User size={18} />
              <span>Profile</span>
            </div>

            <div
              onClick={() => navigate("/history")}
              className="flex items-center gap-2 px-3 py-2 text-sm sm:text-base font-medium rounded-md hover:bg-gray-800 hover:text-gray-300 cursor-pointer transition-all duration-300"
            >
              <Clock size={18} />
              <span>User History</span>
            </div>

            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="rounded-md bg-red-600 px-4 py-2 text-sm sm:text-base font-semibold hover:bg-red-500 transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
