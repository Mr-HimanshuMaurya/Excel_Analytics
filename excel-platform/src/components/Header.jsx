import React from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-50 bg-gray-900 text-white shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div
            onClick={() => navigate("/dashboard")}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-2xl">📊</span>
            <span className="text-lg sm:text-xl font-bold tracking-wide">
              AnalyticsPro
            </span>
          </div>

          <div className="flex items-center gap-4">
            <p
              onClick={() => navigate("/profile")}
              className="px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-800 hover:text-gray-300 cursor-pointer transition-all duration-300"
            >
              Profile
            </p>
            <button
              onClick={() => {
                localStorage.removeItem("token");
                navigate("/");
              }}
              className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold hover:bg-red-500 transition-all duration-300"
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
