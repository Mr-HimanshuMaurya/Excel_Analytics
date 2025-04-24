// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./Authpage.css";
// import { motion } from "framer-motion";

// const SignUp = () => {
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleSignup = async (e) => {
//     e.preventDefault();
//     try {
//       const res = await fetch("", {
//         //node js api
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ username, email, password }),
//       });
//       const data = await res.json();
//       if (data.token) {
//         localStorage.setItem("token", data.token);
//         navigate("/dashboard"); //Dashboard or homepage url
//       } else {
//         alert("Signup failed");
//       }
//     } catch (err) {
//       console.error(err);
//       alert("Signup Failed");
//     }
//   };

//   return (
//     <motion.div
//       className="auth-container"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <form className="auth-form" onSubmit={handleSignup}>
//         <h2>Sign Up</h2>
//         <input
//           type="text"
//           placeholder="Username"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           required
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Set Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Sign Up</button>
//         <p onClick={() => navigate("/login")} className="auth-link">
//           Already have an account? Login
//         </p>
//       </form>
//     </motion.div>
//   );
// };

// export default SignUp;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const SignUp = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("", {
        //node js api
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        navigate("/file-upload"); // Redirect to file upload page after signup
      } else {
        alert("Signup failed");
      }
    } catch (err) {
      console.error(err);
      alert("Signup Failed");
    }
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-gray-100 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <form
        onSubmit={handleSignup}
        className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg flex flex-col gap-4 animate-slide-up"
      >
        <h2 className="text-2xl font-semibold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <input
          type="password"
          placeholder="Set Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="px-4 py-3 border border-gray-300 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-blue-300"
        />

        <button
          type="submit"
          className="w-full py-3 bg-green-500 text-white rounded-lg text-base font-medium transition-transform duration-200 hover:bg-green-600 hover:scale-105 disabled:opacity-50"
        >
          Sign Up
        </button>

        <p
          onClick={() => navigate("/login")}
          className="text-center text-sm text-blue-600 cursor-pointer"
        >
          Already have an account? Login
        </p>
      </form>
    </motion.div>
  );
};

export default SignUp;
