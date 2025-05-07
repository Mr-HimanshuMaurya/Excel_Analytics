// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Authpage.css";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("", {
//         //node js api url
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         navigate("/dashboard"); //Dashboard or Homepage
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <motion.div
//       className="auth-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <form className="auth-form" onSubmit={handleLogin}>
//         <h2>Login</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//         <p onClick={() => navigate("/signup")} className="auth-link">
//           Don't have an account? Sign Up
//         </p>
//       </form>
//     </motion.div>
//   );
// };

// export default Login;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { motion } from "framer-motion";

// const Login = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("", {
//         //node js api url
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, password }),
//       });
//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         navigate("/dashboard"); //Dashboard or Homepage
//       } else {
//         alert("Invalid credentials");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Login failed");
//     }
//   };

//   return (
//     <motion.div
//       className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <form
//         onSubmit={handleLogin}
//         className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg flex flex-col gap-4 animate-slide-up"
//       >
//         <h2 className="text-2xl font-semibold text-center">Login</h2>

//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//           className="px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />

//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//           className="px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
//         />

//         <button
//           type="submit"
//           className="w-full py-3 bg-green-500 text-white rounded-lg text-base font-medium transition-transform duration-200 hover:bg-green-600 hover:scale-105 disabled:opacity-50"
//         >
//           Login
//         </button>

//         <p
//           onClick={() => navigate("/signup")}
//           className="text-center text-sm text-blue-600 hover:underline cursor-pointer"
//         >
//           Don't have an account? Sign Up
//         </p>
//       </form>
//     </motion.div>
//   );
// };

// export default Login;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isAdminLogin, setIsAdminLogin] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isAdminLogin ? "/admin-login" : "/login"; //to use api end point for particular login
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate(isAdminLogin ? "/admin-dashboard" : "/file-upload");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      console.error(err);
      alert("Login failed");
    }
  };

  return (
    <motion.div
      className={`relative flex items-center justify-center min-h-screen p-3 sm:p-4 ${
        isAdminLogin ? "bg-slate-900" : "bg-gray-100"
      }`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="absolute top-4 right-4">
        {!isAdminLogin ? (
          <button
            onClick={() => setIsAdminLogin(true)}
            className="text-xs sm:text-sm text-blue-600"
          >
            Admin Login
          </button>
        ) : (
          <button
            onClick={() => setIsAdminLogin(false)}
            className="text-xs sm:text-sm text-white"
          >
            Back to User Login
          </button>
        )}
      </div>

      <form
        onSubmit={handleLogin}
        className={`w-full max-w-md p-5 sm:p-6 md:p-8 rounded-xl sm:rounded-2xl shadow-lg flex flex-col gap-3 sm:gap-4 animate-slide-up ${
          isAdminLogin ? "bg-gray-800 text-white" : "bg-white"
        }`}
      >
        <h2 className="text-xl sm:text-2xl font-semibold text-center">
          {isAdminLogin ? "Admin Login" : "Login"}
        </h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={`px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 ${
            isAdminLogin
              ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white placeholder-gray-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={`px-3 sm:px-4 py-2 sm:py-3 border rounded-lg text-sm sm:text-base focus:outline-none focus:ring-2 ${
            isAdminLogin
              ? "bg-gray-700 border-gray-600 focus:ring-blue-400 text-white placeholder-gray-300"
              : "border-gray-300 focus:ring-blue-300"
          }`}
        />

        <button
          type="submit"
          className={`w-full py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-transform duration-200 hover:scale-105 ${
            isAdminLogin
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-green-500 text-white hover:bg-green-600"
          }`}
        >
          {isAdminLogin ? "Login as Admin" : "Login"}
        </button>

        {!isAdminLogin && (
          <p
            onClick={() => navigate("/signup")}
            className="text-center text-xs sm:text-sm text-blue-600 cursor-pointer"
          >
            Don't have an account? Sign Up
          </p>
        )}
      </form>
    </motion.div>
  );
};

export default Login;
